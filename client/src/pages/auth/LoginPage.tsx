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
import { BookOpen } from 'lucide-react';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    role: z.enum(['admin', 'peminjam']),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            role: 'peminjam',
        },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data: LoginForm) => {
        try {
            setIsLoading(true);
            setError('');
            await login(data.username, data.password, data.role);

            if (data.role === 'admin') {
                navigate('/admin/books');
            } else {
                navigate('/peminjam/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
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
                    <CardTitle className="text-2xl text-center">Selamat Datang di Perpustakaan Arcadia</CardTitle>
                    <CardDescription className="text-center">
                        Masuk ke akunmu untuk melanjutkan
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
                            <Label>Masuk sebagai</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    type="button"
                                    variant={selectedRole === 'peminjam' ? 'default' : 'outline'}
                                    onClick={() => setValue('role', 'peminjam')}
                                    className="w-full"
                                >
                                    Peminjam
                                </Button>
                                <Button
                                    type="button"
                                    variant={selectedRole === 'admin' ? 'default' : 'outline'}
                                    onClick={() => setValue('role', 'admin')}
                                    className="w-full"
                                >
                                    Admin
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Masukkan username"
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
                                placeholder="Masukkan password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Masuk...' : 'Masuk'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            Belum punya akun?{' '}
                            <Link to="/register" className="text-primary hover:underline">
                                Daftar disini
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
