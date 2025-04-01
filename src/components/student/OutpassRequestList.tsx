
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

type OutpassRequestProps = {
  id: string;
  date: string;
  time: string;
  duration: string;
  reason: string;
  destination: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  studentId: string;
};

const OutpassRequestList: React.FC = () => {
  const [requests, setRequests] = useState<OutpassRequestProps[]>([]);
  
  useEffect(() => {
    // Get outpass requests from localStorage
    const storedRequests = localStorage.getItem('outpassRequests');
    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);
      // Filter to show only current user's requests
      const currentUser = JSON.parse(localStorage.getItem('hostelHubUser') || '{}');
      if (currentUser && currentUser.username) {
        const userRequests = parsedRequests.filter(
          (req: OutpassRequestProps) => req.studentId === currentUser.username
        );
        setRequests(userRequests);
      }
    }
  }, []);
  
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
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Your Outpass Requests</h3>
      </div>
      
      {requests.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          You haven't made any outpass requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{format(new Date(request.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{request.time}</TableCell>
                  <TableCell>{request.destination}</TableCell>
                  <TableCell>{request.duration} hours</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OutpassRequestList;
