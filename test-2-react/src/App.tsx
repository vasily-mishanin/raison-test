import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <main className="flex flex-col p-4 h-full">
                <Route path="/login" component={LoginPage} />
            </main>
        </BrowserRouter>
    )
}

const Header = () => (
    <header className="h-20 bg-primary flex items-center p-4">
        <h1 className="text-3xl text-black">Title</h1>
    </header>
)

function LoginPage() {
    return (
        <Switch>
            <Route>
                <FormInput />
                <div className="p-1"></div>
                <FormCheckbox />
                <button className="btn btn-primary mt-auto">Hold to proceed</button>
            </Route>
            <Route>Not implemented</Route>
        </Switch>
    )
}

function FormCheckbox() {
    return (
        <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span className="label-text">I agree</span>
            </label>
        </div>
    )
}

function FormInput() {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Email</span>
            </div>
            <input type="text" placeholder="Type here" className="input" />
            {/* <div className="label">
                <span className="label-text-alt">Helper text</span>
            </div> */}
        </label>
    )
}
