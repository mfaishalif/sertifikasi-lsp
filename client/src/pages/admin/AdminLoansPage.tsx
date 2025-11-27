import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogOut, CheckCircle, XCircle, Package } from 'lucide-react';
import type { Loan } from '@/types/index.ts';

export default function AdminLoansPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['admin-loans'],
        queryFn: async () => {
            const response = await api.get('/loans');
            return response.data;
        },
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: number; status: string }) => {
            return api.put(`/loans/${id}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-loans'] });
        },
    });

    const removeBookMutation = useMutation({
        mutationFn: async ({ loanId, bookId }: { loanId: number; bookId: number }) => {
            return api.delete(`/loans/${loanId}/books/${bookId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-loans'] });
        },
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'diproses': return 'bg-yellow-100 text-yellow-800';
            case 'disetujui': return 'bg-green-100 text-green-800';
            case 'ditolak': return 'bg-red-100 text-red-800';
            case 'selesai': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-xl font-bold">Perpustakaan Arcadia - Admin</h1>
                            <p className="text-sm text-muted-foreground">Selamat datang, {user?.nama}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate('/admin/books')}>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Books
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Peminjaman Buku</h2>

                {isLoading ? (
                    <div className="text-center py-12">Memuat peminjaman...</div>
                ) : loans.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            Tidak ada peminjaman
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {loans.map((loan: Loan) => (
                            <Card key={loan.kodePinjam}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">
                                                Peminjaman #{loan.kodePinjam} - {loan.peminjam?.namaPeminjam}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Pesan: {new Date(loan.tglPesan).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.statusPinjam)}`}>
                                            {loan.statusPinjam.toUpperCase()}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Buku ({loan.detilPeminjaman.length}):</h4>
                                            <ul className="space-y-2">
                                                {loan.detilPeminjaman.map((detail) => (
                                                    <li key={detail.idBuku} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                                        <span className="text-sm">{detail.buku.judulBuku}</span>
                                                        {loan.statusPinjam === 'diproses' && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Hapus buku ini dari peminjaman?')) {
                                                                        removeBookMutation.mutate({ loanId: loan.kodePinjam, bookId: detail.idBuku });
                                                                    }
                                                                }}
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {loan.statusPinjam === 'diproses' && (
                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    onClick={() => updateStatusMutation.mutate({ id: loan.kodePinjam, status: 'disetujui' })}
                                                    className="flex-1"
                                                >
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Setujui
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => updateStatusMutation.mutate({ id: loan.kodePinjam, status: 'ditolak' })}
                                                    className="flex-1"
                                                >
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                    Tolak
                                                </Button>
                                            </div>
                                        )}

                                        {loan.statusPinjam === 'disetujui' && (
                                            <Button
                                                onClick={() => updateStatusMutation.mutate({ id: loan.kodePinjam, status: 'selesai' })}
                                                className="w-full"
                                            >
                                                <Package className="h-4 w-4 mr-2" />
                                                Konfirmasi Pengembalian
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
