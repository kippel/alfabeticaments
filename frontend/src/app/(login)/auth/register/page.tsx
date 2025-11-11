"use client"
import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios";
import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ButtonLogin, ButtonUser, ButtonUsers } from "../button-login";
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { toast } from "react-hot-toast";
import { useTranslations } from 'next-intl';


type Inputs = {
    username: string,
    password: string,
    confirmPassword: string
}

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    const [error, setError] = useState("");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const onSubmit = handleSubmit(async (data) => {

        if (data.password !== data.confirmPassword) {
            //setError("Les contrasenyes no coincideixen");

            toast('Les contrasenyes no coincideixen', {
                duration: 10000,
                position: 'top-center',                
                icon: '👏',
            });

            return;
        }

        try {
            const resh = await axios.post(`${backendUrl}/auth/register`, data);

            if (resh.status === 200) {
                return router.push("/auth/login");
            }
        } catch (err) {
            const axiosErr = err as AxiosError<{ detail?: string }>;
            const errorMessage = axiosErr.response?.data?.detail || "Error inesperat durant el registre.";

            return setError(errorMessage)
        }
    })

    const t = useTranslations('Register');

    return (
        <div className="flex min-h-screen items-center justify-center">
            <ButtonLogin>
                <ButtonUsers><p className="text-3xl">{t('alfabeticament')}</p></ButtonUsers>

                <ButtonUser><Link href="/auth/login" className="underline text-sm">
                    {t('login')}
                </Link>
            </ButtonUser>


            </ButtonLogin>
             
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Iniciar sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <h1 className="text-slate-200 font-black text-4xl mb-4">
                            {t('register')}
                        </h1>
                        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                        <label htmlFor="name" className="text-slate-400 mb-2 block text-lg">
                            {t('username')}
                        </label>
                        <input type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: t('username_required')
                                }
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                        {
                            errors.username && (
                                <span className="text-red-300">{errors.username.message}</span>
                            )
                        }

                        <label htmlFor="password" className="text-slate-400 mb-2 block text-lg">
                            {t('password')}
                        </label>
                        <input type="password" {...register("password", {
                            required: {
                                value: true,
                                message: t('password_required')
                            }
                        })} className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                        {
                            errors.password && (
                                <span className="text-red-300">{errors.password.message}</span>
                            )
                        }
                        <label htmlFor="confirmPassword" className="text-slate-400 mb-2 block text-lg">
                            {t('confirm_password')}
                        </label>
                        <input type="password" {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: t('confirm_password_required')
                            }
                        })} className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                        {
                            errors.confirmPassword && (
                                <span className="text-red-300">{errors.confirmPassword.message}</span>
                            )
                        }

                        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 ">{t('register')}</button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage;