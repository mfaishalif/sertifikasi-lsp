import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LogOut, Plus, Pencil, Trash2, Library } from 'lucide-react';
import type { Book } from '@/types/index.ts';

export default function AdminBooksPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const [isAdding, setIsAdding] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({
        judulBuku: '',
        namaPengarang: '',
        namaPenerbit: '',
        tglTerbit: '',
    });

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const response = await api.get('/books');
            return response.data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            return api.post('/books', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            setIsAdding(false);
            resetForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: any }) => {
            return api.put(`/books/${id}`, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            setEditingBook(null);
            resetForm();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return api.delete(`/books/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    });

    const resetForm = () => {
        setFormData({
            judulBuku: '',
            namaPengarang: '',
            namaPenerbit: '',
            tglTerbit: '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBook) {
            updateMutation.mutate({ id: editingBook.idBuku, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book);
        setFormData({
            judulBuku: book.judulBuku,
            namaPengarang: book.namaPengarang,
            namaPenerbit: book.namaPenerbit,
            tglTerbit: book.tglTerbit.split('T')[0],
        });
        setIsAdding(true);
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
                        <Button variant="outline" onClick={() => navigate('/admin/loans')}>
                            <Library className="h-4 w-4 mr-2" />
                            Loans
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Management Buku</h2>
                    <Button onClick={() => setIsAdding(!isAdding)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Buku
                    </Button>
                </div>

                {/* Add/Edit Form */}
                {isAdding && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>{editingBook ? 'Edit Buku' : 'Tambah Buku'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="judulBuku">Judul Buku</Label>
                                    <Input
                                        id="judulBuku"
                                        value={formData.judulBuku}
                                        onChange={(e) => setFormData({ ...formData, judulBuku: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="namaPengarang">Pengarang</Label>
                                    <Input
                                        id="namaPengarang"
                                        value={formData.namaPengarang}
                                        onChange={(e) => setFormData({ ...formData, namaPengarang: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="namaPenerbit">Penerbit</Label>
                                    <Input
                                        id="namaPenerbit"
                                        value={formData.namaPenerbit}
                                        onChange={(e) => setFormData({ ...formData, namaPenerbit: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tglTerbit">Tanggal Terbit</Label>
                                    <Input
                                        id="tglTerbit"
                                        type="date"
                                        value={formData.tglTerbit}
                                        onChange={(e) => setFormData({ ...formData, tglTerbit: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-span-2 flex gap-2">
                                    <Button type="submit">
                                        {editingBook ? 'Update' : 'Create'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsAdding(false);
                                            setEditingBook(null);
                                            resetForm();
                                        }}
                                    >
                                        Batal
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Books List */}
                {isLoading ? (
                    <div className="text-center py-12">Memuat buku...</div>
                ) : (
                    <div className="grid gap-4">
                        {books.map((book: Book) => (
                            <Card key={book.idBuku}>
                                <CardContent className="flex justify-between items-center p-6">
                                    <div>
                                        <h3 className="font-semibold text-lg">{book.judulBuku}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            by {book.namaPengarang} • {book.namaPenerbit} • {new Date(book.tglTerbit).getFullYear()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this book?')) {
                                                    deleteMutation.mutate(book.idBuku);
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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
