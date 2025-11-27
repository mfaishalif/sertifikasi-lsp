import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogOut, ShoppingCart, History, Plus, Minus } from 'lucide-react';
import type { Book, Loan } from '@/types/index.ts';

export default function PeminjamDashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const [cart, setCart] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<'catalog' | 'history'>('catalog');

    const { data: books = [] } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await api.get('/books');
            return response.data;
        },
    });

    const { data: myLoans = [] } = useQuery({
        queryKey: ['my-loans'],
        queryFn: async () => {
            const response = await api.get('/loans/my');
            return response.data;
        },
    });

    const createLoanMutation = useMutation({
        mutationFn: async (bookIds: number[]) => {
            return api.post('/loans', { bookIds });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-loans'] });
            setCart([]);
            setActiveTab('history');
        },
    });

    const toggleCart = (bookId: number) => {
        setCart(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Please select at least one book');
            return;
        }
        if (confirm(`Order ${cart.length} book(s)?`)) {
            createLoanMutation.mutate(cart);
        }
    };

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
                            <h1 className="text-xl font-bold">Perpustakaan Arcadia</h1>
                            <p className="text-sm text-muted-foreground">Selamat datang, {user?.nama}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {cart.length > 0 && (
                            <Button onClick={handleCheckout}>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Checkout ({cart.length})
                            </Button>
                        )}
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <Button
                        variant={activeTab === 'catalog' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('catalog')}
                    >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Katalog Buku
                    </Button>
                    <Button
                        variant={activeTab === 'history' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('history')}
                    >
                        <History className="h-4 w-4 mr-2" />
                        Riwayat Peminjaman
                    </Button>
                </div>

                {/* Book Catalog */}
                {activeTab === 'catalog' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Buku Tersedia</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {books.map((book: Book) => {
                                const isInCart = cart.includes(book.idBuku);
                                return (
                                    <Card key={book.idBuku} className={isInCart ? 'border-primary' : ''}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{book.judulBuku}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground mb-1">
                                                <strong>Pengarang:</strong> {book.namaPengarang}
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-1">
                                                <strong>Penerbit:</strong> {book.namaPenerbit}
                                            </p>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                <strong>Tahun Terbit:</strong> {new Date(book.tglTerbit).getFullYear()}
                                            </p>
                                            <Button
                                                onClick={() => toggleCart(book.idBuku)}
                                                variant={isInCart ? 'destructive' : 'default'}
                                                className="w-full"
                                            >
                                                {isInCart ? (
                                                    <>
                                                        <Minus className="h-4 w-4 mr-2" />
                                                        Hapus dari Keranjang
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Tambah ke Keranjang
                                                    </>
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Loan History */}
                {activeTab === 'history' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Riwayat Peminjaman</h2>
                        {myLoans.length === 0 ? (
                            <Card>
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    Tidak ada peminjaman. Mulailah dengan memesan buku dari katalog!
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {myLoans.map((loan: Loan) => (
                                    <Card key={loan.kodePinjam}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <CardTitle className="text-lg">Peminjaman #{loan.kodePinjam}</CardTitle>
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
                                            <h4 className="font-semibold mb-2">Buku ({loan.detilPeminjaman.length}):</h4>
                                            <ul className="space-y-1">
                                                {loan.detilPeminjaman.map((detail) => (
                                                    <li key={detail.idBuku} className="text-sm bg-gray-50 p-2 rounded">
                                                        {detail.buku.judulBuku}
                                                    </li>
                                                ))}
                                            </ul>
                                            {loan.statusPinjam === 'diproses' && (
                                                <p className="text-sm text-muted-foreground mt-4">
                                                    ⏳ Peminjaman Anda sedang diproses oleh admin
                                                </p>
                                            )}
                                            {loan.statusPinjam === 'disetujui' && (
                                                <p className="text-sm text-green-600 mt-4">
                                                    ✅ Peminjaman Anda disetujui! Anda dapat mengambil buku di drive-thru
                                                </p>
                                            )}
                                            {loan.statusPinjam === 'ditolak' && (
                                                <p className="text-sm text-red-600 mt-4">
                                                    ❌ Peminjaman Anda ditolak
                                                </p>
                                            )}
                                            {loan.statusPinjam === 'selesai' && (
                                                <p className="text-sm text-gray-600 mt-4">
                                                    📦 Peminjaman Anda selesai
                                                </p>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
