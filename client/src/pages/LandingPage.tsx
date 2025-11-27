import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Shield } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-primary p-4 rounded-full">
                            <BookOpen className="h-12 w-12 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Drive-Thru Perpustakaan Arcadia
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Pinjam buku secara online dan ambil di drive-thru kami
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-blue-100 p-3 rounded-full w-fit mb-2">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <CardTitle>Untuk Member</CardTitle>
                            <CardDescription>
                                Pilih buku yang ingin kamu pinjam dan ambil di drive-thru kami
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Pilih buku yang ingin kamu pinjam</li>
                                <li>• Pesan banyak buku sekaligus</li>
                                <li>• Track status peminjamanmu</li>
                                <li>• Ambil di drive-thru kami</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="bg-purple-100 p-3 rounded-full w-fit mb-2">
                                <Shield className="h-6 w-6 text-purple-600" />
                            </div>
                            <CardTitle>Untuk Admin</CardTitle>
                            <CardDescription>
                                Kelola buku, proses peminjaman, dan pengembalian dengan mudah
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>• Kelola inventory buku</li>
                                <li>• Review requests peminjaman</li>
                                <li>• Setujui atau Tolak peminjaman</li>
                                <li>• Handle pengembalian buku</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/login">
                        <Button size="lg" className="w-full sm:w-auto">
                            Masuk
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            Daftar sebagai Member
                        </Button>
                    </Link>
                </div>

                {/* Info */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-muted-foreground">
                        Baru di Perpustakaan Arcadia? Daftar sebagai member untuk memulai peminjaman buku!
                    </p>
                </div>
            </div>
        </div>
    );
}
