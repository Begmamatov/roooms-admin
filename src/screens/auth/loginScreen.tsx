
import { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../device'
import { observer } from 'mobx-react-lite'
import useRootStore from '../../hooks/useRootStore'
import lottieFiles from './loading.json'
import Lottie from "lottie-react";
import useToastr from '../../helper/toastr'
import { Navigate, useNavigate } from 'react-router-dom'

function LoginScreen() {

    const [showPassword, setShowPassword] = useState(false)
    const store = useRootStore()
    const toastr = useToastr()
    const navigate = useNavigate();

    const handleEye = () => {
        setShowPassword(!showPassword)
    }

    const login = async () => {
        await store.loginWithFirebaseStore.login()
        toastr[store.loginWithFirebaseStore._toast.key](store.loginWithFirebaseStore._toast.msg)
        if (store.loginWithFirebaseStore.user) {
            navigate('/', { replace: true })
        }
    }

    return (
        <Container>
            <div className='main'>
                <div className='mainBox'>
                    <div className='logoBox'>
                        <h1>Login</h1>
                        <img src="/Logo.svg" alt="Roooms.uz logo" className="logoImg" />
                    </div>
                    <div className="inputsBox">
                        <div className="inputBox">
                            <label htmlFor="email">Email</label>
                            <div className='inputMask'>
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='username@gmail.com'
                                    onInput={(e) => store.loginWithFirebaseStore.setEmail(e.currentTarget.value)}
                                    value={store.loginWithFirebaseStore.email}
                                />
                            </div>
                        </div>

                        <div className="inputBox">
                            <label htmlFor="password">Password</label>
                            <div className='inputMask'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    placeholder='Password'
                                    onInput={(e) => store.loginWithFirebaseStore.setPassword(e.currentTarget.value)}
                                    value={store.loginWithFirebaseStore.password}
                                />
                                <button onClick={handleEye}>
                                    {
                                        showPassword ? <img src="/eye.svg" alt="eye" /> : <img src="/eye-off.svg" alt="eye" />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className='loginBtn' onClick={login}>
                        {
                            store.loginWithFirebaseStore.loading ? <Lottie animationData={lottieFiles} /> : 'Sign in'
                        }
                    </button>
                </div>
            </div>
            <img src="/img.svg" alt="Roooms img" className='leftImg' />
            <div className='bgImg'>
            </div>
        </Container>
    )
}

export default observer(LoginScreen)


const Container = styled.div`
        height: 100vh;
        width: 100vw;
        background: linear-gradient(90deg, #FEDCC5 0%, #FEDDC6 100%);
        overflow: hidden;
        position: relative;

        .main{
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            box-shadow: 0px 4px 70px rgba(0, 0, 0, 0.1);
            display: flex;
            padding: 100px 50px;
            flex-direction: column;
            z-index: 3;
            justify-content: center;

            @media ${device.mobileS} {
                width: 100%;
                height: 450px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                padding: 10px;
                border-radius: 2px;
            }

            @media ${device.mobileM} {
                width: 90%;
                padding: 40px;
                height: 500px;
            }

            @media ${device.mobileL} {
                width: 380px;
                height: 500px;
                padding: 100px 50px;
                border-radius: 40px;
            }

            @media ${device.tablet} {
                width: 450px;
                height: 500px;
                top: calc(50% - 35vh);
                left: calc(25% - 15vw);
                transform: none;
                padding: 100px 50px;
            }

            .logoBox{
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                .logoImg{
                    width: 80px;
                }
            }


            h1{
                font-family: 'Gilroy Bold';
                margin-top: 15px;
            }

            .inputsBox{
                display: flex;
                flex-direction: column;
                margin-top: 30px;
                gap: 32px;

                .inputBox{
                    display: flex;
                    flex-direction: column;
                    label{
                        font-family: 'Gilroy Regular';
                        font-size: 14px;
                        color: #2A1E17;
                    }

                    .inputMask{
                        position: relative;
                        margin-top: 10px;
                        background-color: #FFFFFF;
                        border-radius: 5px;
                        width: 100%;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        padding: 0 20px;

                        input{
                            width: 100%;
                            height: 100%;
                            border: none;
                            outline: none;
                            background-color: transparent;
                            font-family: 'Gilroy Regular';
                        }

                        button{
                            height: 100%;
                            background-color: transparent;
                            border: none;
                            outline: none;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            position: absolute;
                            right: 20px;
                            img{
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
            }

            .loginBtn{
                width: 100%;
                height: 50px;
                background: #F25019;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Gilroy Bold';
                font-size: 20px;
                color: #FFFFFF;
                margin-top: 50px;
                cursor: pointer;
                border: none;
                outline: none;

                &:active{
                    opacity: 0.8;
                }
            } 
        }


        .leftImg{
            position: absolute;
            width: calc(55% + 2vw);
            height: 100%;
            right: 0;
            top: 0;
            object-fit: fill;

            @media ${device.mobileL} {
                width: 700px;
                right: -250px;
            }
            
            @media ${device.tablet} {
                width: calc(70% + 2vw);
                right: -150px;
            }
            
            @media ${device.laptop} {
                width: calc(55% + 2vw);
                right: 0;
            }

            @media ${device.laptopL} {
                width: calc(55% + 2vw);
                right: 0;
            }



        }

        .bgImg{
            position: absolute;
            width: calc(100vw + 2vw);
            height: 100%;
            right: calc(55% - 1vw);
            top: calc(50% - 30vh);
            background: url('/img.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity:0.4;
            filter: blur(5px);
            transform: matrix(-1, 0, 0, 1, 0, 0);
            z-index: 1;
        }
        
`