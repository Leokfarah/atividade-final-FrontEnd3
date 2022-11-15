import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface AlertProps {
  titulo: string,
  mensagem: string,
  severity: 'error' | 'info' | 'success' | 'warning',
};

export const MeuAlert = ({ titulo, mensagem, severity }: AlertProps) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{titulo}</AlertTitle>
      {mensagem}
    </Alert>
  );
}