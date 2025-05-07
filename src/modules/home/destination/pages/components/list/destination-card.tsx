import { PageCard } from '@/shared/components';
import { MoreVert } from '@mui/icons-material';
import { Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DestinationDto } from '../../../domain/dto/destination.dto';
import { DestinationRepository } from '../../../repositories/destination.repository';
import { DestinationUpdate } from '../update/destination-update';
import { ViewModal } from './components/destination-view';

interface DestinationCardProps {
    onUpdate: () => void;
}

export function DestinationCardProps({ }: DestinationCardProps) {
    const [destinations, setDestinations] = useState<DestinationDto[]>([]);
    const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<DestinationDto | null>(null);
    const repository = new DestinationRepository();


    const handleClickMenu = (event: any, id: number) => {
        setSelectedDestinationId(id);
        setAnchorEl(event.currentTarget);
    };

    const handleCardClick = (destination: DestinationDto) => {
        console.log('destination: ', destination);
        setSelectedDestination(destination);

        console.log('selectedDestination: ', selectedDestination);
        setViewModalOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedDestinationId(null);
    }

    const fetchDestinations = async () => {
        try {
            const response = await repository.list();
            setDestinations(response);
        } catch (error) {
            console.error('Erro buscando destinos:', error);
        }
    };

    const handleEdit = async () => {
        setModalOpen(true);
    };

    const handleDeleteDestination = (id: number) => {
        repository.delete(id);
    };

    useEffect(() => {
        fetchDestinations()
    }, [])



    // const handleSaveChanges = async () => {
    //     if (selectedDestination) {
    //         if (selectedDestination.id) {
    //             await repository.update(selectedDestination.id, selectedDestination)
    //             setOpenEditModal(false);
    //             fetchDestinations();
    //         } else {
    //             const newDestination = {
    //                 name: selectedDestination.name,
    //                 description: selectedDestination.description,
    //                 type: selectedDestination.type,
    //             };
    //             await repository.create(newDestination);
    //             setOpenEditModal(false);
    //             fetchDestinations();
    //         }
    //     }
    // };

    useEffect(() => {
        fetchDestinations();
    }, []);

    return (
        <Grid container spacing={2}>
            {destinations.map((destination) => (
                <Grid item key={destination.id} xs={12} sm={6} md={4}>
                    <PageCard onClick={() => {
                        console.log("Card clicado:", destination);
                        handleCardClick(destination);
                    }}
                        sx={{
                            padding: '16px',
                            borderRadius: '16px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.02)',
                                boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)',
                            },
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    {destination.name}
                                </Typography>
                                <IconButton
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleClickMenu(event, destination?.id);
                                    }}
                                >
                                    <MoreVert />
                                </IconButton>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    <strong>{destination.type?.name || 'N/A'}</strong>
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body2" color="text.secondary">
                                    {destination.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </PageCard>
                    <Menu anchorEl={anchorEl} open={selectedDestinationId === destination.id} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => handleEdit()}>Editar</MenuItem>
                        <MenuItem onClick={() => handleDeleteDestination(destination.id)}>
                            Excluir
                        </MenuItem>
                    </Menu>

                    {selectedDestinationId === destination.id && (
                        <DestinationUpdate
                            isOpen={isModalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                handleCloseMenu();
                            }}
                            id={destination.id}
                            data={destination}
                        />
                    )}

                </Grid>
            ))}
            <ViewModal
                open={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                destination={selectedDestination}
            />
        </Grid>
    );
}
