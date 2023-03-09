import { useState } from 'preact/hooks'

export const Label = (props) => (
    <p className={`text-${props.color}-600 font-bold text-sm`}>
        {props.children}
    </p>
)

export default (props) => {
    const [number, setNumber] = useState(0)

    const [correct, setCorrect] = useState(0)
    const [incorrect, setIncorrect] = useState(0)

    const [disabled, setDisabled] = useState(false)
    const [input, setInput] = useState('')
    const [finish, setFinish] = useState(false)

    const question = props.questions[number]

    const [row, setRow] = useState(
        Object.keys(question.choices).sort(() => Math.random() - 0.5)
    )

    return (
        <div className='text-center mx-auto w-3/4 md:w-1/3 bg-white p-10 rounded-md shadow-md border border-slate-300'>
            {finish ? (
                <>
                    <p class='font-bold text-xl'>Result</p>
                    <div className='mt-10'>
                        <h1 className='font-bold text-2xl'>Corrects</h1>
                        <p className='font-mono font-bold text-xl text-slate-500 mt-5'>
                            {correct}/{props.questions.length}
                        </p>
                    </div>
                    <div className='mt-10'>
                        <h1 className='font-bold text-2xl'>Incorrects</h1>
                        <p className='font-mono font-bold text-xl text-slate-500 mt-5'>
                            {incorrect}/{props.questions.length}
                        </p>
                    </div>
                    <button
                        onClick={() => location.reload()}
                        className='mt-10 text-sm inline-flex items-center align-middle justify-center px-4 py-1 rounded-md border border-blue-600 shadow-md text-white bg-blue-500 m-1 transition hover:scale-125'
                    >
                        <span>Again</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                fillRule='evenodd'
                                d='M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </button>
                </>
            ) : (
                <>
                    <p className='text-slate-500 font-bold text-xl'>
                        #{number + 1}
                    </p>
                    <h1 className='text-2xl font-bold mt-5'>
                        {question.title}
                    </h1>
                    <div className='my-10'>
                        {row.map((key) => (
                            <button
                                onClick={() => {
                                    setDisabled(true)
                                    setInput(key)
                                }}
                                disabled={disabled}
                                className={`px-4 py-2 rounded-md border border-blue-600 shadow-md text-white bg-blue-500 m-1 transition hover:scale-125 disabled:(scale-100 ${
                                    disabled && question.answer === key
                                        ? 'bg-green-500 border-green-600 text-white'
                                        : input === key
                                        ? 'bg-red-500 border-red-600 text-white'
                                        : 'disabled:(bg-slate-200 border-slate-300 text-black)'
                                })`}
                            >
                                {question.choices[key]}
                            </button>
                        ))}
                    </div>
                    {disabled &&
                        (input === question.answer ? (
                            <Label color='green'>Correct!</Label>
                        ) : (
                            <Label color='red'>Incorrect!</Label>
                        ))}
                    {disabled && (
                        <button
                            onClick={() => {
                                if (input === question.answer) {
                                    setCorrect(correct + 1)
                                } else {
                                    setIncorrect(incorrect + 1)
                                }
                                if (number < props.questions.length - 1) {
                                    setRow(
                                        Object.keys(
                                            props.questions[number + 1].choices
                                        ).sort(() => Math.random() - 0.5)
                                    )
                                    setNumber(number + 1)
                                } else {
                                    setFinish(true)
                                }
                                setDisabled(false)
                            }}
                            className='mt-2 text-sm inline-flex items-center align-middle justify-center px-4 py-1 rounded-md border border-blue-600 shadow-md text-white bg-blue-500 m-1 transition hover:scale-125'
                        >
                            <span>Next</span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                className='w-5 h-5'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    )}
                </>
            )}
        </div>
    )
}
