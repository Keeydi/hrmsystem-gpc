import DashboardLayoutNew from "@/components/Layout/DashboardLayoutNew";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

interface Attendance {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: "present" | "absent" | "late" | "half-day" | "leave";
  notes?: string;
}

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingSampleData, setUsingSampleData] = useState(false);

  // Sample data for prototype
  const sampleAttendance: Attendance[] = [
    {
      id: "sample-1",
      employeeId: user?.employeeId || "25-GPC-0001",
      employeeName: user?.fullName || "Sample Employee",
      date: new Date().toISOString().split("T")[0],
      checkIn: "08:05",
      checkOut: "17:00",
      status: "present",
      notes: "On time",
    },
    {
      id: "sample-2",
      employeeId: user?.employeeId || "25-GPC-0001",
      employeeName: user?.fullName || "Sample Employee",
      date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
      checkIn: "08:15",
      checkOut: "17:10",
      status: "late",
      notes: "On Leave",
    },
    {
      id: "sample-3",
      employeeId: user?.employeeId || "25-GPC-0001",
      employeeName: user?.fullName || "Sample Employee",
      date: new Date(Date.now() - 172800000).toISOString().split("T")[0],
      checkIn: "08:00",
      checkOut: "17:00",
      status: "present",
    },
  ];

  useEffect(() => {
    const fetchAttendance = async () => {
      if (!user?.employeeId) {
        setAttendance(sampleAttendance);
        setUsingSampleData(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/attendance?employeeId=${user.employeeId}`
        );

        if (response.ok) {
          const data = await response.json();
          const records = data.data || [];
          if (records.length > 0) {
            setAttendance(records);
            setUsingSampleData(false);
          } else {
            setAttendance(sampleAttendance);
            setUsingSampleData(true);
          }
        } else {
          setAttendance(sampleAttendance);
          setUsingSampleData(true);
        }
      } catch (error) {
        console.error("Error fetching attendance", error);
        setAttendance(sampleAttendance);
        setUsingSampleData(true);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Unable to load attendance data. Showing sample data.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [user, toast]);

  const formatTime = (time?: string) => {
    if (!time) return "N/A";
    return time;
  };

  const getStatusBadge = (status: Attendance["status"]) => {
    const variants: Record<
      Attendance["status"],
      "default" | "secondary" | "destructive" | "outline"
    > = {
      present: "default",
      late: "secondary",
      absent: "destructive",
      "half-day": "outline",
      leave: "outline",
    };
    return (
      <Badge variant={variants[status]} className="rounded-full px-3">
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    );
  };

  return (
    <DashboardLayoutNew>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Attendance History
          </h1>
          <p className="text-muted-foreground">
            View your attendance records (Read-only)
          </p>
        </div>

        {usingSampleData && (
          <Card className="border-primary/20 bg-primary/5"></Card>
        )}

        <Card className="shadow-sm border-border">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">My Attendance Records</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                Loading attendance records...
              </div>
            ) : attendance.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                No attendance records found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium">Date</th>
                      <th className="py-3 px-4 text-left font-medium">
                        Check In
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Check Out
                      </th>
                      <th className="py-3 px-4 text-left font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-left font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((record, index) => (
                        <tr
                          key={record.id}
                          className={
                            index % 2 === 0 ? "bg-[#eef3ff]" : "bg-white"
                          }
                        >
                          <td className="py-3 px-4 font-medium">
                            {new Date(record.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {formatTime(record.checkIn)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {formatTime(record.checkOut)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(record.status)}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {record.notes || "-"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutNew>
  );
};

export default EmployeeDashboard;
