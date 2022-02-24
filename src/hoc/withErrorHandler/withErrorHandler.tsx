import React, { useEffect, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RouteComponentProps } from 'react-router';

const withErrorHandler = (WrappedComponent : (props: RouteComponentProps) => JSX.Element, axios : AxiosInstance) => {
    return (props : any) => {
        const [error, setError] = useState(null);

        const onHide = () => {
            setError(null);
        }

        const reqInterceptor = axios.interceptors.request.use((req : AxiosRequestConfig<any>) => {
            setError(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(undefined, (error : any) => {
            setError(error.message);
            return Promise.reject(error);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor])

        return (
            <React.Fragment>
                <Dialog dismissableMask={true}
                    visible={error ? true : false} onHide={() => onHide()} 
                    breakpoints={{'960px': '75vw'}} style={{width: '50vw'}}
                    baseZIndex={1000}>
                        <React.Fragment>
                            <h1 style={{ textAlign: 'center', marginTop: '0', marginBottom: 'calc(80px - 2rem)' }} ><strong>Something didn't work!</strong></h1>
                        </React.Fragment>
                </Dialog>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    }
}

export default withErrorHandler;