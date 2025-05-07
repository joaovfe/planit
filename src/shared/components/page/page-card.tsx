import { Paper } from '@mui/material';

interface PageCardProps {
  children: React.ReactNode;
  sx?: object;
  onClick?: () => void;
}

export function PageCard({ children, sx, onClick }: PageCardProps) {
  return (
    <Paper
      sx={{
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        display: 'flex',
        borderRadius: 3,
        padding: 3,
        gap: 3,
        ...sx,
      }}
      onClick={onClick}  // Passando onClick para o Paper
    >
      {children}
    </Paper>
  );
}
