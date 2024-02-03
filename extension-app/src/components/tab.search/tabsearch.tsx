import React from "react";
import {
    Avatar,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper, TextField,
    Theme,
    useTheme
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {Tab} from "../../context/context";
import {selectTab} from "../../api/extension";

const TabSearch = (props: { tabs: Array<Tab> }) => {
    const {
        tabs
    } = props
    const theme = useTheme();
    const styles = getStyles(theme);
    const [searchText, setSearchText] = React.useState<string>('')
    const [currentTabs, setCurrentTabs] = React.useState<Array<Tab>>([])
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const selectedItemRef = React.useRef<HTMLDivElement>()

    const filterTabs = (tabs: Array<any>, searchText: string) => {
        const filterTabs = tabs.filter((tab) => {
            return tab.title.toLowerCase().includes(searchText.toLowerCase())
        })
        setCurrentTabs(filterTabs)
        setSelectedIndex(0)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            setSelectedIndex(previousIndex => {
                const nextIndex = (previousIndex + 1) % currentTabs.length
                return nextIndex
            })
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setSelectedIndex(previousIndex => {
                const nextIndex = (previousIndex - 1 < 0 ? (currentTabs.length + previousIndex - 1) : previousIndex - 1) % currentTabs.length
                return nextIndex
            })
        } else if (event.key === 'Enter') {
            event.preventDefault()
            handleSelect(selectedIndex)
        } else if (event.key === 'Tab') {
            event.preventDefault()
        }
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchText(value)
        filterTabs(tabs, value)
    }

    const handleSelect = (index: number) => {
        const selectedTab = currentTabs[index]
        selectTab(selectedTab.id)
    }

    React.useEffect(() => {
        setCurrentTabs(tabs)
    }, [tabs.length])

    React.useEffect(() => {
        selectedItemRef.current?.scrollIntoView({block: 'center'})
    }, [selectedIndex])

    return (
        <Paper elevation={0} style={styles.container}>
            <Grid xs={12} style={styles.listGrid}>
                <TextField autoFocus={true} label="Search" variant="standard" fullWidth onChange={onChange}
                           onKeyDown={handleKeyDown}
                           value={searchText} tabIndex={0}/>
            </Grid>
            <Grid xs={12} style={styles.listGrid}>
                <List component="nav" aria-label="main mailbox folders">
                    {
                        currentTabs.map((tab, index) => {
                            return (
                                <span key={tab.id}>
                                    <ListItemButton style={styles.listItem}
                                                    ref={(ref) => {
                                                        if (index === selectedIndex && ref) {
                                                            selectedItemRef.current = ref
                                                        }
                                                    }}
                                                    selected={index === selectedIndex}
                                                    onClick={() => handleSelect(index)}>
                                        {
                                            tab.favIconUrl ?
                                                <ListItemAvatar>
                                                    <Avatar
                                                        alt={tab.title}
                                                        src={tab.favIconUrl}
                                                        variant={"square"}
                                                        sx={{width: 15, height: 15}}/>
                                                </ListItemAvatar> :
                                                <ListItemIcon>
                                                    <SettingsIcon sx={{width: 15, height: 15}}/>
                                                </ListItemIcon>
                                        }
                                        <ListItemText primary={tab.title} style={styles.text}/>
                                    </ListItemButton>
                                </span>
                            )
                        })
                    }
                </List>
            </Grid>
        </Paper>
    );
}

const getStyles = (theme: Theme) => {
    return {
        container: {
            width: '22rem',
            padding: '0.5rem 0.5rem 0 0.5rem',
        },
        textGrid: {
            height: '3rem'
        },
        listGrid: {
            'maxHeight': '30rem',
            'overflow-y': 'auto',
        },
        listItem: {
            height: '1.3rem'
        },
        text: {
            'overflow': 'hidden',
            'white-space': 'nowrap',
        }
    }
}
export {TabSearch}
