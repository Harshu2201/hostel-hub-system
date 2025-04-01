
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const OutpassRequestForm: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a date for your outpass",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Save outpass request to localStorage
      const outpassRequests = JSON.parse(localStorage.getItem('outpassRequests') || '[]');
      const newRequest = {
        id: Date.now().toString(),
        date: date.toISOString(),
        time,
        duration,
        reason,
        destination,
        status: 'pending',
        createdAt: new Date().toISOString(),
        studentId: JSON.parse(localStorage.getItem('hostelHubUser')!).username
      };
      
      outpassRequests.push(newRequest);
      localStorage.setItem('outpassRequests', JSON.stringify(outpassRequests));
      
      toast({
        title: "Request submitted",
        description: "Your outpass request has been submitted for approval",
      });
      
      // Reset form
      setDate(undefined);
      setTime('');
      setDuration('');
      setReason('');
      setDestination('');
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Outpass</CardTitle>
        <CardDescription>
          Fill in the details to request permission to leave the hostel
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">Duration (hours)</label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="Enter duration in hours"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium">Destination</label>
            <Input
              id="destination"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">Reason</label>
            <Textarea
              id="reason"
              placeholder="Explain the reason for your outpass request"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="btn-student"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              "Submit Request"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default OutpassRequestForm;
