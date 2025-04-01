
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { Check, X, Eye } from 'lucide-react';

type OutpassRequest = {
  id: string;
  date: string;
  time: string;
  duration: string;
  reason: string;
  destination: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  studentId: string;
  comment?: string;
};

const OutpassApproval: React.FC = () => {
  const [requests, setRequests] = useState<OutpassRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<OutpassRequest | null>(null);
  const [comment, setComment] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'approve' | 'reject' | null>(null);
  
  const { toast } = useToast();
  
  // Load outpass requests from localStorage
  useEffect(() => {
    const storedRequests = localStorage.getItem('outpassRequests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);
  
  const handleView = (request: OutpassRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };
  
  const handleActionClick = (request: OutpassRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setPendingAction(action);
    setActionDialogOpen(true);
  };
  
  const handleAction = () => {
    if (!selectedRequest || !pendingAction) return;
    
    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        return {
          ...req,
          status: pendingAction,
          comment: comment || undefined
        };
      }
      return req;
    });
    
    // Update localStorage
    localStorage.setItem('outpassRequests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
    
    // Show toast notification
    toast({
      title: pendingAction === 'approve' ? 'Outpass Approved' : 'Outpass Rejected',
      description: `Student notification has been sent${pendingAction === 'approve' ? '. SMS sent to parents.' : '.'}`,
    });
    
    // Reset state
    setActionDialogOpen(false);
    setComment('');
    setPendingAction(null);
    setSelectedRequest(null);
  };
  
  const getPendingCount = () => {
    return requests.filter(req => req.status === 'pending').length;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500 hover:bg-green-600';
      case 'rejected':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Outpass Requests</CardTitle>
              <CardDescription>Review and approve student outpass requests</CardDescription>
            </div>
            
            <Badge className="bg-yellow-500 hover:bg-yellow-600 w-fit">
              {getPendingCount()} Pending Requests
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              There are no outpass requests to display.
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.studentId}</TableCell>
                      <TableCell>{format(new Date(request.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{request.time}</TableCell>
                      <TableCell>{request.destination}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleView(request)}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Button>
                          
                          {request.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleActionClick(request, 'approve')}
                                title="Approve"
                              >
                                <Check size={16} />
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleActionClick(request, 'reject')}
                                title="Reject"
                              >
                                <X size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Request Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Outpass Request Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedRequest && format(new Date(selectedRequest.createdAt), 'MMM dd, yyyy')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Student ID</h4>
                  <p>{selectedRequest.studentId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Status</h4>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Date</h4>
                  <p>{format(new Date(selectedRequest.date), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Time</h4>
                  <p>{selectedRequest.time}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Duration</h4>
                <p>{selectedRequest.duration} hours</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Destination</h4>
                <p>{selectedRequest.destination}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Reason</h4>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              
              {selectedRequest.comment && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Admin Comment</h4>
                  <p className="text-sm">{selectedRequest.comment}</p>
                </div>
              )}
              
              {selectedRequest.status === 'pending' && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleActionClick(selectedRequest, 'approve');
                    }}
                  >
                    <Check size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button 
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleActionClick(selectedRequest, 'reject');
                    }}
                  >
                    <X size={16} className="mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingAction === 'approve' ? 'Approve Outpass' : 'Reject Outpass'}
            </DialogTitle>
            <DialogDescription>
              {pendingAction === 'approve'
                ? 'The student will be notified and an SMS will be sent to parents.'
                : 'Please provide a reason for rejecting this request.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                {pendingAction === 'approve' ? 'Additional Comments (Optional)' : 'Reason for Rejection'}
              </label>
              <Textarea
                placeholder={pendingAction === 'approve' ? "Add any instructions or notes..." : "Provide a reason for rejection..."}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required={pendingAction === 'reject'}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className={pendingAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              onClick={handleAction}
              disabled={pendingAction === 'reject' && !comment.trim()}
            >
              {pendingAction === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OutpassApproval;
