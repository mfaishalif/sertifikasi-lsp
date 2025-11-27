import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Upload } from 'lucide-react';

const registerSchema = z.object({
    nama: z.string().min(1, 'Name is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    foto: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterForm) => {
        try {
            setIsLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('nama', data.nama);
            formData.append('username', data.username);
            formData.append('password', data.password);

            if (data.foto && data.foto[0]) {
                formData.append('foto', data.foto[0]);
            }

            await registerUser(formData);
            navigate('/peminjam/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-primary p-3 rounded-full">
                            <BookOpen className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center">Buat Akun Baru</CardTitle>
                    <CardDescription className="text-center">
                        Daftar sebagai member baru
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="nama">Nama Lengkap</Label>
                            <Input
                                id="nama"
                                placeholder="Masukkan nama lengkapmu"
                                {...register('nama')}
                            />
                            {errors.nama && (
                                <p className="text-sm text-destructive">{errors.nama.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Pilih username"
                                {...register('username')}
                            />
                            {errors.username && (
                                <p className="text-sm text-destructive">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Masukkan passwordmu"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Masukkan passwordmu lagi"
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="foto">Foto Profil (Opsional)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="foto"
                                    type="file"
                                    accept="image/*"
                                    {...register('foto')}
                                    onChange={(e) => {
                                        register('foto').onChange(e);
                                        setFileName(e.target.files?.[0]?.name || '');
                                    }}
                                    className="cursor-pointer"
                                />
                            </div>
                            {fileName && (
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Upload className="h-3 w-3" />
                                    {fileName}
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Mendaftar...' : 'Daftar'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                Masuk
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
