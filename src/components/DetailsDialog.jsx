import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Stack, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Section = ({ title, children }) => (
    <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        {children}
        <Divider />
    </Stack>    
)

export default function DetailsDialog({ user, onClose }) {
    const open = Boolean(user);
    const address = user && user.address;
    
    const displayKeys = ["name", "email", "phone", "website"];
    const addressKeys = ["street", "suite", "city", "zipcode"];

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">{user && user.name}</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {user && (
                    <Stack spacing={2}>
                        <Section title="Contact Information">
                            <Stack spacing={1}>
                                {displayKeys.map((key) => (
                                    <Stack key={key} direction="row" alignItems="baseline" spacing={1}>
                                        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>{key}</Typography>
                                        <Typography variant="body2" fontWeight="600">{user[key]}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Section>
                        <Section title="Address">
                            <Typography>
                                {address && addressKeys.map((key) => address[key]).filter(Boolean).join(', ')}
                            </Typography>
                        </Section>
                        <Section title="Company">
                            <Typography fontWeight="500">{user.company && user.company.name}</Typography>
                            <Typography color="text.secondary">{user.company && user.company.catchPhrase}</Typography>
                            <Typography variant="body2">Focus: {user.company && user.company.bs}</Typography>
                        </Section>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    )
}