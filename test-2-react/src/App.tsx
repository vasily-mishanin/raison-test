import React, { useEffect, useMemo, useState } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { FormState, PopUpElement } from './types'

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="flex flex-col p-4 h-full">
                <Route path="/" exact component={RedirectComponent} />
                <Route path="/login/*" component={LoginPage} />
                {/* <Route path="/login/step-2" component={ConfirmPage} /> */}
            </main>
        </BrowserRouter>
    )
}

const RedirectComponent = () => {
    const history = useHistory()

    useEffect(() => {
        history.push('/login/step-1')
    }, [history])

    return <div>Redirecting to /login...</div>
}

const Header = () => (
    <header className="h-20 bg-primary flex items-center p-4">
        <h1 className="text-3xl text-black">Title</h1>
    </header>
)

function LoginPage() {
    const [formState, setFormState] = useState<FormState>({ agree: false, email: '' })
    const [isButtonHeld, setIsButtonHeld] = useState(false)
    const [timer, setTimer] = useState(0)
    const history = useHistory()

    const isEmailValid = useMemo(
        () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formState.email),
        [formState.email]
    )

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (isButtonHeld && isEmailValid && formState.agree) {
                history.push('/login/step-2')
            }
        }, 500)

        if (isEmailValid) {
            sessionStorage.setItem('email', formState.email)
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [isButtonHeld])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, email: e.target.value }))
    }

    const handleButtonMouseDown = () => {
        setTimer(Date.now())
        setIsButtonHeld(true)
    }

    const handleButtonMouseUp = () => {
        setTimer(500 - (Date.now() - timer))
        setIsButtonHeld(false)
    }

    return (
        <Switch>
            <Route path="/login/step-1">
                <FormInput value={formState.email} onChange={handleChange} />
                <div className="p-1"></div>
                <FormCheckbox
                    onChange={(e) => setFormState((prev) => ({ ...prev, agree: !prev.agree }))}
                    checked={formState.agree}
                />
                <button
                    className="btn btn-primary mt-auto"
                    disabled={!isEmailValid || !formState.agree}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onTouchStart={handleButtonMouseDown}
                    onTouchEnd={handleButtonMouseUp}
                >
                    {timer > 0 && timer < 500 ? `Left - ${timer} ms` : 'Hold to proceed'}
                </button>
            </Route>
            <Route path="/login/step-2" component={ConfirmPage} />
        </Switch>
    )
}

function ConfirmPage() {
    const [message, setMessage] = useState('')
    const [isWaiting, setIsWaiting] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(true)
    const history = useHistory()
    const enteredEmail = sessionStorage.getItem('email')

    useEffect(() => {
        const popupElement: PopUpElement = document.getElementById('popup')! as PopUpElement

        // register handler on click " < "
        const handlePopState = () => {
            const currentState = window.history.state
            if (currentState && currentState.popupOpen === true) {
                window.history.replaceState(null, '')
            }

            setIsPopupOpen(false)
            setMessage('')
            if (!isPopupOpen) {
                history.goBack()
            }
        }

        if (message) {
            setIsPopupOpen(true)
            popupElement.showModal()
            window.history.pushState({ popupOpen: true }, '')
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [message, isPopupOpen])

    const handlePopUpClose = () => {
        const currentState = window.history.state
        if (currentState && currentState.popupOpen === true) {
            window.history.replaceState(null, '')
        }
        setMessage('')
        setIsPopupOpen(false)
    }

    const handleConfirm = async () => {
        setMessage('')
        try {
            setIsWaiting(true)
            const response = await fetch('/api/endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: enteredEmail }),
            })
            setIsWaiting(false)
            if (response.ok) {
                setMessage('Success!')
            } else {
                console.log(response)
                setMessage('Error!')
            }
        } catch (error) {
            console.log(error)
            setMessage('Error!')
        }
    }

    return (
        <>
            <FormInput value={enteredEmail || ''} onChange={() => {}} />
            <div className="p-1"></div>

            <div className="flex gap-4 justify-between mt-auto w-full">
                <button className="btn btn-neutral flex-grow" onClick={() => history.goBack()}>
                    Back
                </button>
                <button className="btn btn-primary flex-grow" onClick={handleConfirm} disabled={isWaiting}>
                    Confirm
                </button>
            </div>
            <PopUp message={message} isOpen={isPopupOpen} onClose={handlePopUpClose} />
        </>
    )
}

function FormCheckbox({
    onChange,
    checked,
}: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
}) {
    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" onChange={onChange} checked={checked} />
                <span className="label-text">I agree</span>
            </label>
        </div>
    )
}

function FormInput({
    onChange,
    value,
    isActive = true,
}: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    isActive?: boolean
}) {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input
                type="text"
                placeholder={'Type here'}
                className="input"
                value={isActive ? value : ''}
                onChange={onChange}
                disabled={!isActive}
            />
            {/* <div className="label">
                <span className="label-text-alt">Helper text</span>
            </div> */}
        </label>
    )
}

function PopUp({ message, isOpen, onClose }: { message: String; isOpen: boolean; onClose: () => void }) {
    if (!isOpen) {
        return null
    }

    return (
        <dialog id="popup" className="modal">
            <div className="modal-box w-80">
                <h3 className="font-bold text-lg">{message}</h3>

                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={onClose}>
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}
