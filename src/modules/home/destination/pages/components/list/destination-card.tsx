import { PageCard } from '@/shared/components';
import { MoreVert } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DestinationDto } from '../../../domain/dto/destination.dto';
import { DestinationRepository } from '../../../repositories/destination.repository';

interface DestinationCardProps {
    onUpdate: () => void;
}

export function DestinationCardProps({ }: DestinationCardProps) {
    const [destinations, setDestinations] = useState<DestinationDto[]>([]);
    const [_, setSelectedId] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDestination, setSelectedDestination] = useState<DestinationDto | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const repository = new DestinationRepository();


    const handleClickMenu = (event: any, id: number) => {
        setSelectedId(id);
        setAnchorEl(event.currentTarget);
    };

    const fetchDestinations = async () => {
        try {
            const response = await repository.list();
            setDestinations(response);
        } catch (error) {
            console.error('Erro buscando destinos:', error);
        }
    };

    const handleCloseModal = () => {
        setOpenEditModal(false);
    };

    const handleEditDestination = (destination: DestinationDto) => {
        setSelectedDestination(destination);
        setOpenEditModal(true);
    };

    const handleDeleteDestination = (id: number) => {
        repository.delete(id);
    };

    const handleSaveChanges = async () => {
        if (selectedDestination) {
            if (selectedDestination.id) {
                await repository.update(selectedDestination.id, selectedDestination)
                setOpenEditModal(false);
                fetchDestinations();
            } else {
                const newDestination = {
                    name: selectedDestination.name,
                    description: selectedDestination.description,
                    type: selectedDestination.type,
                };
                await repository.create(newDestination);
                setOpenEditModal(false);
                fetchDestinations();
            }
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    return (
        <Grid container spacing={3}>
            {destinations.map((destination) => (
                <Grid item key={destination.id} xs={12} sm={6} md={4}>
                    <PageCard
                        sx={{
                            padding: '16px',
                            borderRadius: '12px',
                            boxShadow: 3,
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 6,
                            },
                        }}
                    >
                        <Box
                            sx={{
                                height: '120px',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '16px',
                            }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {destination.name}
                            </Typography>
                            <IconButton onClick={() => handleEditDestination(destination)}>
                                <MoreVert />
                            </IconButton>
                        </Box>

                        <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {destination.type?.name}
                            </Typography>
                            <IconButton
                                onClick={(event) => handleClickMenu(event, destination.id)}
                                sx={{ opacity: 0, '&:hover': { opacity: 1 } }}
                            >
                                <MoreVert />
                            </IconButton>
                        </Grid>

                        <Modal open={openEditModal} onClose={handleCloseModal}>
                            <Box sx={{ padding: 2, backgroundColor: 'white', width: '400px', margin: 'auto', marginTop: '20%' }}>
                                <TextField
                                    label="Nome"
                                    fullWidth
                                    value={selectedDestination?.name || ''}
                                // onChange={(e) => setSelectedDestination({ ...selectedDestination, name: e.target.value })}
                                />
                                <TextField
                                    label="Descrição"
                                    fullWidth
                                    value={selectedDestination?.description || ''}
                                    // onChange={(e) => setSelectedDestination({ ...selectedDestination, description: e.target.value })}
                                    sx={{ marginTop: 2 }}
                                />
                                <Button onClick={handleSaveChanges} sx={{ marginTop: 2 }}>
                                    {selectedDestination?.id ? 'Salvar Alterações' : 'Criar Novo Destino'}
                                </Button>
                            </Box>
                        </Modal>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            {destination.description?.substring(0, 80)}{destination.description?.length > 80 ? '...' : ''}
                        </Typography>
                    </PageCard>

                    <IconButton onClick={(event) => handleClickMenu(event, destination.id)}>
                        <MoreVert />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={() => handleEditDestination(destination)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleDeleteDestination(destination.id)}>Excluir</MenuItem>
                    </Menu>
                </Grid>
            ))}
        </Grid>
    );
}
