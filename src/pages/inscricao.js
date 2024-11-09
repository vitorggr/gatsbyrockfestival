import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Container,
    Typography,
    Radio,
    Snackbar
} from '@mui/material';
import Layout from '../components/layout';
import Footer from "../components/footer";
import DadosGerais from '../components/form/dadosgerais';
import Membros from '../components/form/membros';
import MembrosGrid from '../components/form/membrosgrid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: red[900],
            light: '#ff7961',
            dark: '#ba000d',
        }
    },
});

export default function InscricaoPage() {
    const { control, handleSubmit, register, reset, watch, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [integrante, setIntegrante] = useState({
        nome: '',
        email: '',
        lider: false,
        instrumentos: []
    });
    const [integrantes, setIntegrantes] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [membrosError, setMembrosError] = useState('');
    const [liderError, setLiderError] = useState('');
    const [selectedEstado, setSelectedEstado] = useState("");

    const fetchEstados = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
            const data = await response.json();
            setEstados(data);
        } catch (error) {
            console.error('Erro ao carregar estados:', error);
        }
    };

    useEffect(() => {
        fetchEstados();
    }, []);

    useEffect(() => {
        const fetchCidades = async () => {
            if (selectedEstado) {
                try {
                    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedEstado}/municipios`);
                    const data = await response.json();
                    setCidades(data);
                } catch (error) {
                    console.error('Erro ao carregar cidades:', error);
                }
            }
        };
        fetchCidades();
    }, [selectedEstado]);

    useEffect(() => {
        setSelectedEstado(watch("estado"));
    }, [watch("estado")]);

    const handleIntegranteChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'instrumentos') {
            let updatedInstrumentos = [...integrante.instrumentos];

            if (checked) {
                updatedInstrumentos.push(value);
            } else {
                updatedInstrumentos = updatedInstrumentos.filter(instr => instr !== value);
            }

            setIntegrante(prevState => ({
                ...prevState,
                instrumentos: updatedInstrumentos
            }));
        } else {
            setIntegrante(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleAddIntegrante = () => {
        if (!integrante.nome || !integrante.email) {
            setMembrosError('Nome e email do integrante são obrigatórios');
            return;
        }

        if (!integrante.instrumentos.length) {
            setMembrosError('Instrumentos do integrante são obrigatórios');
            return;
        }

        const hasLider = integrantes.some(integrante => integrante.lider);

        if (integrante.lider && hasLider && editIndex === null) {
            setLiderError('Já existe um líder na banda');
            return;
        }

        setMembrosError('');
        setLiderError('');

        if (editIndex !== null) {
            const updatedIntegrantes = [...integrantes];
            updatedIntegrantes[editIndex] = integrante;
            setIntegrantes(updatedIntegrantes);
            setEditIndex(null);
        } else {
            setIntegrantes(prevIntegrantes => [...prevIntegrantes, integrante]);
        }

        setIntegrante({ nome: '', email: '', lider: false, instrumentos: [] });
    };

    const handleEditIntegrante = (index) => {
        setIntegrante(integrantes[index]);
        setEditIndex(index);
    };

    const handleDeleteIntegrante = (index) => {
        const updatedIntegrantes = integrantes.filter((_, i) => i !== index);
        setIntegrantes(updatedIntegrantes);
    };

    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const onSubmit = (data) => {

        if (integrantes.length === 0) {
            setMembrosError('É necessário adicionar pelo menos um integrante.');
            return;
        }

        if (!integrantes.some(integrante => integrante.lider)) {
            setMembrosError('É necessário definir pelo menos um líder na banda.');
            return;
        }
        
        data.integrantes = JSON.stringify(integrantes);

        const formData = {
            "form-name": "form_inscricao", 
            ...data 
        };
    
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(formData)
        }).then(() => {
            handleCleanForm();
            setMessage('Inscrição enviada com sucesso');
            setOpen(true);
        }).catch(error => alert(error));

    };

    const handleCleanForm = () => {
        setIntegrantes([]);
        setEstados([]);
        setCidades([]);
        reset();
        setSelectedEstado("");
        fetchEstados();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Layout>
            <ThemeProvider theme={theme}>
                <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" gutterBottom>Inscrição</Typography>
                    <form name="form_inscricao" data-netlify="true" method="post" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="form-name" value="form_inscricao" />
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message={message}
                            action={
                                <Button color="inherit" onClick={handleClose}>
                                    Fechar
                                </Button>
                            }
                        />
                        <Typography variant="h6">Informações Gerais</Typography>
                        <DadosGerais
                            control={control}
                            watch={watch}
                            errors={errors}
                            estados={estados}
                            cidades={cidades}
                            selectedEstado={selectedEstado}
                            register={register}
                        />
                        <FormControl component="fieldset" margin="normal">
                            <Typography>Quanto tempo de existência da banda?</Typography>
                            <Controller
                                name="longevidade"
                                control={control}
                                rules={{ required: 'Longevidade é obrigatória' }}
                                render={({ field }) => (
                                    <RadioGroup {...field}>
                                        {[
                                            'Menos de 1 ano',
                                            '1 ano',
                                            '2 anos',
                                            'Menos de 5 anos',
                                            'Menos de 10 anos',
                                            'Mais de 10 anos'
                                        ].map((option) => (
                                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                            {errors.longevidade && <p style={{ color: 'red' }}>{errors.longevidade.message}</p>}
                        </FormControl>
                        <Typography variant="h6">Integrantes</Typography>
                        <Membros
                            integrante={integrante}
                            handleIntegranteChange={handleIntegranteChange}
                            handleAddIntegrante={handleAddIntegrante}
                            editIndex={editIndex}
                            liderError={liderError}
                            membrosError={membrosError}
                        />
                        {integrantes.length > 0 && (
                            <MembrosGrid
                                integrantes={integrantes}
                                handleEditIntegrante={handleEditIntegrante}
                                handleDeleteIntegrante={handleDeleteIntegrante}
                            />
                        )}
                        <Box sx={{ mt: 4, justify: 'center' }}>
                            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                                Enviar Inscrição
                            </Button>
                        </Box>
                    </form>
                </Container>
                <Footer />
            </ThemeProvider>
        </Layout>
    );
}

export const Head = () => <title>Inscrição - Gatsby Rock Festival</title>;
