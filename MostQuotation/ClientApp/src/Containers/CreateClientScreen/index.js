//Modules
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from "moment";

//Components
import Sidebar from '../../Components/Sidebar';
import Dropzone from '../../Components/Dropzone';
import Button from '../../Components/Button';
import Loading from '../../Components/Loading';
import VideoRecord from '../../Components/VideoRecord';
import Form from '../../Components/Form';

//Utils
import { getBase64 } from '../../Utils/Utils.js';

//Styles
import {
    Container,
    ContainerSelfie,
    InputText,
    InputTitle,
    ContainerInputText,
    Footer,
    ButtonDiv,
    ContainerPerfilImg,
    ImgPerfil,
    ContainerLiveness,
    ButtonFinish,
    ButtonExit,
    Icon,
    ContainerDropzone,
    SpanTitleLiveness,
    SpanErrorLiveness,
    SpanErrorMessage,
    ContainerPerfilEmpty,
    ContainerPerfilEmptyText,
    SpanPerfilEmpty,
    ContainerNavBar,
    NavBarTitle,
    Row,
    ContainerButtonSubmit
} from './styles.js';

//Services
import { MostQI } from '../../Services/MostQI';
import { API } from '../../Services/API';

export default function CreateClientScreen() {
    //useState
    const [firstTime, setFirstTime] = useState(true);
    const [showModalLiveness, setShowModalLiveness] = useState(false);
    const [livenessErrorMessage, setLivenessErrorMessage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [livenessVideo, setLivenessVideo] = useState(undefined);
    const [perfilImg, setPerfilImg] = useState(undefined);
    const [documentFrontImg, setDocumentFrontImg] = useState(undefined);
    const [documentBackImg, setDocumentBackImg] = useState(undefined);
    const [name, setName] = useState("");
    const [RG, setRG] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    //useRef
    const videoRef = useRef(null);

    //Navigate
    const navigate = useNavigate();

    const setInputWithContentExtraction = contentExtraction => {
        contentExtraction.forEach(content => {
            switch (content.name) { 
                case "nome": setName(content.value);
                    break;
                case "data_nascimento": setDateOfBirth(moment(content.value).format("D/MM/YYYY"));
                    break;
                case "rg": setRG(content.value);
                    break;
            }   
        });
    };

    const callContentExtractionMostQI = async file => {
        setIsLoading(true);
        const auth = await MostQI.authentication();
        if (auth.success) {
            const contentExtraction = await MostQI.contentExtraction(file.split(',')[1], auth.data);
            if (contentExtraction.success) {
                setInputWithContentExtraction(contentExtraction.data);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        async function fetchData() {
            await callContentExtractionMostQI(documentFrontImg);
        };
        if (documentFrontImg) {
            fetchData();
        }
    }, [documentFrontImg]);

    const onDropDocumentFront = acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentFrontImg);
    };

    useEffect(() => {
        async function fetchData() {
            await callContentExtractionMostQI(documentBackImg);
        };
        if (documentBackImg) {
            fetchData();
        }
    }, [documentBackImg]);

    const onDropDocumentBack = acceptedFiles => {
        getBase64(acceptedFiles[0], setDocumentBackImg);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (livenessVideo) {
                const auth = await MostQI.authentication();
                if (auth.success) {
                    const response = await MostQI.livenessDetection(livenessVideo.split(',')[2], auth.data);
                    if (response.success && response.data.scoreLiveness > 0.5) {
                        setPerfilImg(`data:image/jpeg;base64,${response.data.frontalImage}`);
                        setShowModalLiveness(false);
                        setFirstTime(false);
                        setLivenessErrorMessage(undefined);
                        setShowModalLiveness(undefined);
                    } else {
                        setLivenessErrorMessage("Seu video nao foi aprovado na prova de vida ou ele e muito longo, favor tentar novamente");
                    }
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, [livenessVideo, setLivenessVideo]);

    const handleClickSendLiveness = async () => {
        setIsLoading(true);
        try {
            getBase64(videoRef.current.blob, setLivenessVideo);
        } catch (ex) {
            setLivenessErrorMessage("E necessario gravar o video para prosseguir");
            setIsLoading(false);
        }
    };

    const InputValidation = () => {
        let hasError = false;
        if (!documentFrontImg) {
            setErrorMessage("A foto frontal do documento e obrigatoria");
            hasError = true;
        }
        if (!documentBackImg) {
            setErrorMessage("A foto do verso do documento e obrigatoria ");
            hasError = true;
        }
        if (name.length == 0) {
            setErrorMessage("O nome e obrigatorio");
            hasError = true;
        }
        if (RG.length == 0) {
            setErrorMessage("O RG e obrigatorio");
            hasError = true;
        } else if (RG.length > 9) {
            setErrorMessage("O RG tem como numero maximo de caracteres 9");
            hasError = true;
        }
        if (dateOfBirth.length == 0) {
            setErrorMessage("A data de nascimento e obrigatorio");
            hasError = true;
        } else if (dateOfBirth.length > 10) {
            setErrorMessage("A data de nascimento tem como numero maximo de caracteres 10");
            hasError = true;
        }
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.length == 0) {
            setErrorMessage("O email e obrigatorio");
            hasError = true;
        } else if (!regex.test(email)) {
            setErrorMessage("O email digitado nao e um email valido");
            hasError = true;
        }
        return !hasError;
    };

    const handleClickSend = async () => {
        setErrorMessage(undefined);
        setIsLoading(true);
        if (InputValidation()) {
            const authFaceCompare = await MostQI.authentication();
            if (authFaceCompare.success) {
                const responseFaceCompare = await MostQI.faceCompare(perfilImg.split(',')[1], documentFrontImg.split(',')[1], authFaceCompare.data);
                if (responseFaceCompare.success && responseFaceCompare.data < 0.5) {
                    const userToken = JSON.parse(localStorage.getItem('token'));
                    const user = JSON.parse(localStorage.getItem('user'));
                    const responseCreate = await API.createClient(name, email, RG, dateOfBirth, documentFrontImg.split(',')[1], documentBackImg.split(',')[1], perfilImg.split(',')[1], user.name, userToken.access_token);
                    if (responseCreate.success) {
                        alert('Cliente cadastrado com sucesso');
                        navigate('/collaborator');
                    } else {
                        setErrorMessage(responseCreate.errors[0]);
                    }
                } else {
                    setErrorMessage("A pessoa que tirou a selfie nao e a mesma do RG");
                }
            }
        }
        setIsLoading(false);
    };

    const ModalUploadVideoLiveness = () => {
        return (
            <ContainerLiveness>
                {!firstTime &&
                    <ButtonExit onClick={() => setShowModalLiveness(false)}>
                        <Icon className="fa-solid fa-xmark" />
                    </ButtonExit>}
                <SpanTitleLiveness>
                    Grave seu video aqui para realizar a prova de vida, durante a gravacao mova sua cabeca para CIMA, BAIXO, ESQUERDA, DIREITA e SORRIA seguindo essa ordem
                </SpanTitleLiveness>
                {livenessErrorMessage && <SpanErrorLiveness>
                    {livenessErrorMessage}
                </SpanErrorLiveness>}
                <VideoRecord videoRef={videoRef} />
                <ButtonFinish onClick={handleClickSendLiveness}>Enviar</ButtonFinish>
            </ContainerLiveness>
        );
    };

    const InputTextComponent = useCallback(({ title, setState, value}) => (
            <ContainerInputText>
                <InputTitle>{title}</InputTitle>
                <InputText type="text" onChange={event => setState(event.target.value)} value={value}/>
            </ContainerInputText>
    ), []);

    const SelfieImgComponent = useCallback(() => (
        perfilImg ?
            <ContainerPerfilImg onClick={() => setShowModalLiveness(true)}>
                <ImgPerfil src={perfilImg} />
            </ContainerPerfilImg>
            :
            <ContainerDropzone onClick={() => setShowModalLiveness(true)} isSelfie={true}>
                <ContainerPerfilEmpty>
                    <ContainerPerfilEmptyText>
                        <Icon className="fa-solid fa-camera" />
                        <SpanPerfilEmpty>Grave um video aqui, que a foto ira ser gerada automaticamente</SpanPerfilEmpty>
                    </ContainerPerfilEmptyText>
                </ContainerPerfilEmpty>
            </ContainerDropzone>         
    ), [perfilImg]);

    return (
        <Container>
            {(firstTime || showModalLiveness) && <ModalUploadVideoLiveness />}
            {isLoading && <Loading />}
            <Sidebar />
            <ContainerNavBar>
                <NavBarTitle>Cadastro de Cliente</NavBarTitle>
            </ContainerNavBar>
            <Form isGrid={true}>
                <Row>
                    <ContainerSelfie>
                        <SelfieImgComponent />
                    </ContainerSelfie>
                    <ContainerDropzone>
                        <Dropzone text={"Coloque aqui a foto frontal do documento"} onDrop={onDropDocumentFront} imageShow={documentFrontImg} iconShow="fa-solid fa-upload" />
                    </ContainerDropzone>
                    <ContainerDropzone>
                        <Dropzone text={"Coloque aqui a foto do anverso do documento aqui"} onDrop={onDropDocumentBack} imageShow={documentBackImg} iconShow="fa-solid fa-upload" />
                    </ContainerDropzone>
                </Row>
                <InputTextComponent title="Nome:" setState={setName} value={name} />
                <InputTextComponent title="RG:" setState={setRG} value={RG} />
                <InputTextComponent title="Data de nascimento:" setState={setDateOfBirth} value={dateOfBirth} />
                <InputTextComponent title="Email:" setState={setEmail} value={email} />
                <ContainerButtonSubmit hasErrorMessage={errorMessage}>
                    {errorMessage &&
                        <SpanErrorMessage>{errorMessage}</SpanErrorMessage>}
                    <ButtonDiv>
                        <Button onClick={handleClickSend} text="Cadastrar" />
                    </ButtonDiv>
                </ContainerButtonSubmit>
            </Form>
            <Footer />
        </Container>
    );
}