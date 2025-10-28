import React, { useMemo } from "react";
import { AppBar, Toolbar, Typography, Container, Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress, Stack, Pagination, Autocomplete } from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import DetailsDialog from "./components/DetailsDialog";
import ContactCard from "./components/ContactCard";

const ENDPOINT = "https://jsonplaceholder.typicode.com/users";

export default function ContactsApp() {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    const [q, setQ] = React.useState("");
    const [sortKey, setSortKey] = React.useState("name");
    const [city, setCity] = React.useState("all");
    const [selected, setSelected] = React.useState(null);
    
    const [page, setPage] = React.useState(1);
    const PAGE_SIZE = 8;
    
    React.useEffect(() => {
        let ignored = false;
        setLoading(true);
        fetch(ENDPOINT)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Error fetching users: ${res.statusText}`);
                }
                return res.json();
            })
            .then((data) => {
                if (!ignored) {
                    setUsers(Array.isArray(data) ? data : []);
                }
            })
            .catch((err) => {
                if (!ignored) {
                    setError(err.message || "Failed to load users");
                }
            })
            .finally(() => !ignored && setLoading(false));
        
        return () => (ignored = true);
    }, []);
    
    const cities = useMemo(() => {
        const set = new Set(users.map((u) => u.address && u.address.city).filter(Boolean));
        return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, [users]);

    // The filter will search all possible fields of user
    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        let arr = users.filter((user) => {
            const detail = [user.name, user.username, user.email, user.phone, user.website, user.company?.name, user.address?.city]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            const byCity = city === "all" || user.address?.city === city;
            return byCity && detail.includes(query);
        })
        
        const sorter = {
            name: (a, b) => a.name.localeCompare(b.name),
            company: (a, b) => (a.company?.name || "").localeCompare(b.company?.name || ""),
            city: (a, b) => (a.address?.city || "").localeCompare(b.address?.city || ""),
        } [sortKey];
        
        return sorter ? arr.sort(sorter) : arr;
        
    }, [users, q, city, sortKey]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    
    React.useEffect(() => {
        setPage(1);
    }, [q, city, sortKey]);

    return (
        <Box sx={{ height: "100dvh", width: "100dvw" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <ContactsIcon sx={{ mr: 1 }} /> Contacts
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            placeholder="Search..."
                            value={q}
                            size="medium"
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="city">City</InputLabel>
                            <Select
                                labelId="city"
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                {cities.map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c === "all" ? "All cities" : c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        

                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="sort">Sort by</InputLabel>
                            <Select
                                labelId="sort"
                                value={sortKey}
                                label="Sort by"
                                onChange={(e) => setSortKey(e.target.value)}
                            >
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="company">Company</MenuItem>
                                <MenuItem value="city">City</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                
                {error && (
                    <Typography color="error" variant="body1">
                        {error}
                    </Typography>
                )}
                
                {loading ? (
                    <Stack alignItems="center">
                        <CircularProgress />
                    </Stack>
                ) : (
                    <Grid container spacing={2}>
                        {pageData.map((user) => (
                            <Grid item key={user.id} xs={12} sm={6} md={4} lg={3} size={4}>
                                <ContactCard user={user} onOpen={() => setSelected(user)} />
                            </Grid>
                        ))}
                    </Grid>
                )} 
                
                {!loading && filtered.length === 0 && (
                    <Stack alignItems="center">
                        <Typography variant="body1">No contacts found</Typography>
                    </Stack>
                )}
                
                {totalPages > 1 && (
                    <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 4, mb: 4}} >
                        <Pagination 
                            count={totalPages}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                        />
                    </Stack>
                )}
            </Container>
            
            <DetailsDialog user={selected} onClose={() => setSelected(null)} />
        </Box>
    )

}
