import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { truncate } from '@/lib/utils';
import { Button, CardActions, CardMedia, Link } from '@mui/material';
import { useTranslation } from "next-i18next";
export type CardProps = {
    data: any,
    maxWidth: number,
    className?: string
    actionButtons?: () => React.ReactElement
    onClick?: () => void
}
export default function ActionCard({ data, maxWidth, className, actionButtons, onClick }: CardProps) {
    const { t } = useTranslation();
    return (
        <Card className={className} variant="outlined" sx={{ minWidth: 300, maxWidth: maxWidth ? maxWidth : '', marginRight: 2.5, marginLeft: 2.5 }}>

            <React.Fragment>
                <CardContent onClick={onClick} style={{ cursor: 'pointer' }}>
                    <div className=' text-xl	whitespace-pre-line'>
                        {data?.i18N ? t(`MENU.TRANSCRIPT_AND_RESUME`) : data?.title}
                    </div>
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
                        {truncate(data?.description, 80)}
                    </Typography>
                    <Typography variant="body2">
                        {data?.subject}
                    </Typography>
                </CardContent>
                {
                    data?.link &&
                    <CardActions>
                        <Link href={data?.link}>
                            <Button size="small">Acessar</Button>
                        </Link>
                    </CardActions>
                }
                {actionButtons && actionButtons()}
            </React.Fragment>
        </Card>
    );
}