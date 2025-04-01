
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Search, X } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: string;
  name: string;
  roomNumber: string;
  block: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

const MealTracking: React.FC = () => {
  // Mock data for students
  const mockStudents: Student[] = [
    { id: '1', name: 'Rahul Sharma', roomNumber: 'A-101', block: 'A', breakfast: false, lunch: false, dinner: false },
    { id: '2', name: 'Priya Patel', roomNumber: 'B-205', block: 'B', breakfast: false, lunch: false, dinner: false },
    { id: '3', name: 'Aakash Singh', roomNumber: 'A-102', block: 'A', breakfast: false, lunch: false, dinner: false },
    { id: '4', name: 'Sneha Gupta', roomNumber: 'C-301', block: 'C', breakfast: false, lunch: false, dinner: false },
    { id: '5', name: 'Vikram Reddy', roomNumber: 'B-210', block: 'B', breakfast: false, lunch: false, dinner: false },
    { id: '6', name: 'Ananya Desai', roomNumber: 'A-105', block: 'A', breakfast: false, lunch: false, dinner: false },
    { id: '7', name: 'Rajesh Kumar', roomNumber: 'C-304', block: 'C', breakfast: false, lunch: false, dinner: false },
    { id: '8', name: 'Kavita Mehra', roomNumber: 'B-215', block: 'B', breakfast: false, lunch: false, dinner: false },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const { toast } = useToast();
  
  // Initialize student data
  useEffect(() => {
    // Check if we have student data in localStorage
    const storedStudents = localStorage.getItem('hostelStudents');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      // If not, use mock data
      setStudents(mockStudents);
      localStorage.setItem('hostelStudents', JSON.stringify(mockStudents));
    }
  }, []);
  
  // Filter students based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredStudents(students);
      return;
    }
    
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.block.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredStudents(filtered);
  }, [searchTerm, students]);
  
  const handleCheckboxChange = (studentId: string, meal: 'breakfast' | 'lunch' | 'dinner') => {
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          [meal]: !student[meal]
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    localStorage.setItem('hostelStudents', JSON.stringify(updatedStudents));
    
    const student = updatedStudents.find(s => s.id === studentId);
    if (student) {
      if (student[meal]) {
        toast({
          title: "Meal marked",
          description: `${meal.charAt(0).toUpperCase() + meal.slice(1)} marked for ${student.name}`,
        });
      } else {
        toast({
          title: "Meal unmarked",
          description: `${meal.charAt(0).toUpperCase() + meal.slice(1)} unmarked for ${student.name}`,
        });
      }
    }
  };
  
  const handleSendSMS = () => {
    toast({
      title: "SMS notifications sent",
      description: "Parents have been notified about meal attendance.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meal Tracking</CardTitle>
          <CardDescription>Track student attendance for daily meals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button onClick={handleSendSMS} className="btn-mess w-full md:w-auto">
              Send SMS to Parents
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-center">Breakfast</TableHead>
                  <TableHead className="text-center">Lunch</TableHead>
                  <TableHead className="text-center">Dinner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.roomNumber}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={student.breakfast}
                            onCheckedChange={() => handleCheckboxChange(student.id, 'breakfast')}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={student.lunch}
                            onCheckedChange={() => handleCheckboxChange(student.id, 'lunch')}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={student.dinner}
                            onCheckedChange={() => handleCheckboxChange(student.id, 'dinner')}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No students found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {filteredStudents.length} of {students.length} students
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm">
                <Check size={14} className="text-green-600 mr-1" />
                <span>Present</span>
              </div>
              <div className="flex items-center text-sm">
                <X size={14} className="text-red-600 mr-1" />
                <span>Absent</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Daily Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Breakfast Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.breakfast).length} / {students.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((students.filter(s => s.breakfast).length / students.length) * 100) || 0}% attendance
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-mess" 
                style={{ width: `${(students.filter(s => s.breakfast).length / students.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lunch Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.lunch).length} / {students.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((students.filter(s => s.lunch).length / students.length) * 100) || 0}% attendance
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-mess" 
                style={{ width: `${(students.filter(s => s.lunch).length / students.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dinner Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.dinner).length} / {students.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round((students.filter(s => s.dinner).length / students.length) * 100) || 0}% attendance
            </div>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-mess" 
                style={{ width: `${(students.filter(s => s.dinner).length / students.length) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealTracking;
