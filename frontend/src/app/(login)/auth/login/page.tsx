"use client"
import { useForm } from "react-hook-form"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ButtonLogin, ButtonUser, ButtonUsers } from "../button-login";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTranslations } from 'next-intl';

type Inputs = {
    username: string,
    password: string,

}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [error, setError] = useState("");
    const router = useRouter();
    //const [message, setMessage] =
    const onSubmit = handleSubmit(async (data) => {
        //console.log(data)
        const res = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false
        })

        if (res?.error) return setError(res.error as string)

        if (res?.ok) return router.push("/dash")

    })

    const t = useTranslations('Login');

    return (
        <div className="flex min-h-screen items-center justify-center">

            <ButtonLogin>
                <ButtonUsers><p className="text-3xl">{t('alfabeticament')}</p></ButtonUsers>

                <ButtonUser><Link href="/auth/register" className="underline text-sm">
                    {t('register')}
                </Link></ButtonUser>


            </ButtonLogin>
            <Card className="w-full max-w-sm">                
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <h1 className="text-slate-200 font-black text-4xl mb-4">
                            {t('login')}
                        </h1>
                        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

                        <label htmlFor="username" className="text-slate-400 mb-2 block text-lg">
                            {t('username')}
                        </label>
                        <input type="text"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: t('username_required')
                                }
                            })}
                            className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full" />
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
                        })} className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full" />
                        {
                            errors.password && (
                                <span className="text-red-300">{errors.password.message}</span>
                            )
                        }
                        <Button variant="primary" className="w-full mt-2 rounded-lg">{t('login')}</Button>

                    </form>

                </CardContent>
            </Card>

        </div>
    )
}

export default LoginPage;