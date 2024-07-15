import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, CardMedia, Link } from '@mui/material';
import { useTranslation } from "next-i18next";
export type CardProps = {
    maxWidth: number
}
export default function MenuCards({ maxWidth }: CardProps) {
    const { t } = useTranslation();
    return (
        <Card variant="outlined" sx={{ borderRadius: 2, minWidth: 205, maxWidth: maxWidth ? maxWidth : '' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={'../images/img-menu-1.jpeg'}
                title=""
            />
            <React.Fragment>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {t(`MENU.TRANSCRIPT_AND_RESUME`)}
                    </Typography>
                    <Typography color="text.secondary" sx={{
                        fontSize: {
                            lg: 12,
                            md: 11,
                            sm: 10,
                            xs: 10
                        },
                        wordWrap: 'break-word',
                        width: '11rem',
                    }}>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link href={'./transcripts'}>
                        <Button size="small">{t('Acessar')}</Button>
                    </Link>
                </CardActions>
            </React.Fragment>
        </Card>
    );
}