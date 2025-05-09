import { Card, CardContent, Typography } from '@mui/material';

interface BaggageItemProps {
    name: string;
}

export function BaggageItemSuggestion({ name }: BaggageItemProps) {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="body1">{name}</Typography>
            </CardContent>
        </Card>
    );
}
