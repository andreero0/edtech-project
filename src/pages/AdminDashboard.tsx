
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  role: string;
  subject?: string;
  teachers?: number;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: registrations, isLoading, error } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
        throw error;
      }

      return data as Registration[];
    },
    enabled: !!user && isAdmin,
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-white mb-2">Admin Dashboard</h1>
            <p className="text-blue-200/80">Manage registrations and system settings</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10"
            >
              View Site
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-red-500/30 text-red-300 hover:bg-red-500/10"
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-300">Total Registrations</CardTitle>
              <CardDescription>All-time registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {registrations?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-300">Unique Schools</CardTitle>
              <CardDescription>Schools represented</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {registrations ? new Set(registrations.map(r => r.school)).size : 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-300">Recent Registrations</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {registrations ? 
                  registrations.filter(r => 
                    new Date(r.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ).length : 0
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-300">All Registrations</CardTitle>
            <CardDescription>Complete list of registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Loading registrations...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-400">Error loading registrations</div>
            ) : !registrations || registrations.length === 0 ? (
              <div className="text-center py-8 text-gray-400">No registrations found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-blue-300">Name</TableHead>
                      <TableHead className="text-blue-300">Email</TableHead>
                      <TableHead className="text-blue-300">School</TableHead>
                      <TableHead className="text-blue-300">Role</TableHead>
                      <TableHead className="text-blue-300">Subject</TableHead>
                      <TableHead className="text-blue-300">Teachers</TableHead>
                      <TableHead className="text-blue-300">Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration) => (
                      <TableRow key={registration.id} className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="text-white">{registration.name}</TableCell>
                        <TableCell className="text-gray-300">{registration.email}</TableCell>
                        <TableCell className="text-gray-300">{registration.school}</TableCell>
                        <TableCell className="text-gray-300 capitalize">{registration.role}</TableCell>
                        <TableCell className="text-gray-300">{registration.subject || '-'}</TableCell>
                        <TableCell className="text-gray-300">{registration.teachers || '-'}</TableCell>
                        <TableCell className="text-gray-300">{formatDate(registration.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
