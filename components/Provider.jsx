import { Head } from '$fresh/runtime.ts'

export default (props) => (
    <>
        <Head>
            <title>Askey</title>
            <meta charset='UTF-8' />
        </Head>
        <header className='text-center p-5 bg-white'>
            <a href='/' className='text-3xl font-bold'>
                Askey
            </a>
        </header>
        <main className='bg-white p-10'>{props.children}</main>
        <footer className='text-center text-sm font-bold text-slate-500 pt-5'>
            Copyright &copy; {new Date().getFullYear()} kstdx All rights
            reserved.
        </footer>
    </>
)
