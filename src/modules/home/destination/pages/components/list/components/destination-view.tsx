import { DestinationDto } from '@/modules/home/destination/domain/dto/destination.dto';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';

interface ViewModalProps {
    open: boolean;
    onClose: () => void;
    destination: DestinationDto | null;
}

export function ViewModal({ open, onClose, destination }: ViewModalProps) {
    if (!destination) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{destination.name}</DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2" gutterBottom>
                     {destination.type?.name || 'N/A'}
                </Typography>
                <Typography variant="body1">{destination.description}</Typography>
            </DialogContent>
        </Dialog>
    );
}