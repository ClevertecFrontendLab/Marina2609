import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    AppLayout,
    AuthLayout,
    AuthorizationForm,
    Loader,
    RegistrationForm,
    ResultLayout,
} from './components';
import {
    ChangePasswordPage,
    ConfirmEmailPage,
    ErrorAuthPage,
    ErrorEmailNoExistPage,
    ErrorEmailPage,
    ErrorExistPage,
    ErrorPasswordPage,
    ErrorRegistrationPage,
    CommentsPage,
    PasswordSuccessPage,
    RegistrationSuccessPage,
    WelcomePage,
} from './pages';
import { useAppSelector } from './hooks/TypedReactReduxHooks';
import { RootState } from './redux/ConfigureStore';

export const App = () => {
    const { isLoading } = useAppSelector((state: RootState) => state.loader);

    const MainPage = lazy(async () => ({
        default: (await import('./pages/main-page/MainPage')).MainPage,
    }));

    return (
        <>
            {isLoading && <Loader />}
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index={true} element={<WelcomePage />} />
                    <Route
                        path='main'
                        element={
                            <Suspense fallback={<Loader />}>
                                <MainPage />
                            </Suspense>
                        }
                    />
                    <Route path='feedbacks' element={<CommentsPage />} />
                </Route>
                <Route path='/auth' element={<AuthLayout />}>
                    <Route index element={<AuthorizationForm />} />
                    <Route path='registration' element={<RegistrationForm />} />
                    <Route path='confirm-email' element={<ConfirmEmailPage />} />
                    <Route path='change-password' element={<ChangePasswordPage />} />
                </Route>
                <Route path='/result' element={<ResultLayout />}>
                    <Route path='error-login' element={<ErrorAuthPage />} />
                    <Route path='success' element={<RegistrationSuccessPage />} />
                    <Route path='error' element={<ErrorRegistrationPage />} />
                    <Route path='error-user-exist' element={<ErrorExistPage />} />
                    <Route path='error-check-email-no-exist' element={<ErrorEmailNoExistPage />} />
                    <Route path='error-check-email' element={<ErrorEmailPage />} />
                    <Route path='error-change-password' element={<ErrorPasswordPage />} />
                    <Route path='success-change-password' element={<PasswordSuccessPage />} />
                </Route>

                {/* <Route path='*' element={<NotFoundPage/>}/> valadzkoaliaksei@tut.by  1234qqQQ */}
            </Routes>
        </>
    );
};
