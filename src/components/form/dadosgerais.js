import React from 'react';
import { TextField, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export default function DadosGerais({ register, errors, estados, cidades, selectedEstado }) {
    return (
        <>
            <TextField
                fullWidth
                label="Nome da Banda"
                {...register('nome', { required: 'Nome da banda é obrigatório' })}  // Uso correto de register
                margin="normal"
                error={!!errors.nome}
                helperText={errors.nome?.message}
            />
            <TextField
                fullWidth
                label="Breve Release"
                {...register('release', { required: 'Release é obrigatório' })}  // Uso correto de register
                margin="normal"
                multiline
                rows={4}
                error={!!errors.release}
                helperText={errors.release?.message}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Estado</InputLabel>
                <Select
                    {...register('estado', { required: 'Estado é obrigatório' })}  // Uso correto de register
                    error={!!errors.estado}
                >
                    {estados.map(estado => (
                        <MenuItem key={estado.id} value={estado.sigla}>
                            {estado.sigla} - {estado.nome}
                        </MenuItem>
                    ))}
                </Select>
                {errors.estado && <p style={{ color: 'red' }}>{errors.estado.message}</p>}
            </FormControl>
            {selectedEstado && (<FormControl fullWidth margin="normal">
                <InputLabel>Cidade</InputLabel>
                <Select
                    {...register('cidade', { required: 'Cidade é obrigatória' })}  // Uso correto de register
                    error={!!errors.cidade}
                >
                    {cidades.map(municipio => (
                        <MenuItem key={municipio.id} value={municipio.nome}>
                            {municipio.nome}
                        </MenuItem>
                    ))}
                </Select>
                {errors.cidade && <p style={{ color: 'red' }}>{errors.cidade.message}</p>}
            </FormControl>)}
        </>
    );
}
