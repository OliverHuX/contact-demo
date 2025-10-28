import { Card, CardContent, Typography, Box, Stack, CardActions, Divider, Button, Tooltip, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ContactCard({ user, onOpen }) {
    
    const displayKeys = ["email", "phone", "website"];
    const nested = {
        "company": user.company?.name,
        "city": user.address?.city,
    };
    // random avatar based on user id
    const avatarUrl = `https://i.pravatar.cc/160?u=${user.id}f`;

    return (
        <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 2}}>
            <CardContent sx={{ pb: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar
                      src={avatarUrl}
                      alt={AccountCircleIcon}
                      sx={{
                        width: 60,
                        height: 60,
                        border: "4px solid #fff",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                      }}
                    />
                <Stack spacing={0.5} flexGrow={1} minWidth={0}>
                    <Tooltip title={user.name} arrow>
                        <Typography variant="h6" sx={{ 
                            overflow: "hidden", 
                            textOverflow: "ellipsis", 
                            whiteSpace: "nowrap", 
                            cursor: "default"
                        }}>
                            {user.name}
                        </Typography>
                    </Tooltip>
                    <Tooltip title={user.username} arrow>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                            overflow: "hidden", 
                            textOverflow: "ellipsis", 
                            whiteSpace: "nowrap", 
                            cursor: "default"
                        }}>
                            {user.username}
                        </Typography>
                    </Tooltip>
                </Stack>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={1}>
                    {Object.entries(nested).map(([key, value]) => value ? 
                        <Stack key={key} direction="row" alignItems="baseline" spacing={1}>
                            <Typography variant="body2" color="text.secondary">{key}</Typography>
                            <Tooltip title={value} arrow>
                                <Typography variant="body2" sx={{ 
                                    overflow: "hidden", 
                                    textOverflow: "ellipsis", 
                                    whiteSpace: "nowrap", 
                                    cursor: "default"
                                }}>
                                    {value}
                                </Typography>
                            </Tooltip>
                        </Stack> : null
                    )}
                    {displayKeys.map((key) => (
                        <Stack key={key} direction="row" alignItems="baseline" spacing={1}>
                            <Typography variant="body2" color="text.secondary">{key}</Typography>
                            <Tooltip title={user[key]} arrow>
                                <Typography variant="body2" sx={{
                                    overflow: "hidden", 
                                    textOverflow: "ellipsis", 
                                    whiteSpace: "nowrap", 
                                    cursor: "default"
                                }}>
                                    {user[key]}
                                </Typography>
                            
                            </Tooltip>
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
            <CardActions>
                <Button fullWidth variant='contained' onClick={onOpen}>View Details</Button>
            </CardActions>
        </Card>
    )
}