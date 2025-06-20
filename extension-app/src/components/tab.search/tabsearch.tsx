import React from "react";
import {
    Avatar,
    Box,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper, Stack, styled,
    TextField,
    Theme, Tooltip,
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
            const text = searchText.toLowerCase()
            return tab.title?.toLowerCase().includes(text) || tab.url?.toLowerCase().includes(text)
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
            <Grid xs={12}>
                <TextField autoFocus={true} variant="standard" fullWidth onChange={onChange}
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
                                                        sx={{width: 20, height: 20}}/>
                                                </ListItemAvatar> :
                                                <ListItemIcon>
                                                    <SettingsIcon sx={{width: 20, height: 20}}/>
                                                </ListItemIcon>
                                        }
                                        <ListItemText primary={tab.title}
                                                      secondary={tab.url}
                                                      style={styles.text}/>
                                    </ListItemButton>
                                </span>
                            )
                        })
                    }
                </List>
            </Grid>
            <Grid xs={12} style={styles.boxGrid}>
                {
                    currentTabs.map((tab, index) => {
                        return (
                            <div style={styles.listItemInGridView}>
                                <Tooltip title={tab.title} placement={"top"} key={tab.id}
                                         onClick={() => handleSelect(index)}>
                                    {
                                        tab.favIconUrl ?
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={tab.title}
                                                    src={tab.favIconUrl}
                                                    variant={"square"}
                                                    sx={{width: 20, height: 20}}/>
                                            </ListItemAvatar> :
                                            <ListItemIcon>
                                                <SettingsIcon sx={{width: 20, height: 20}}/>
                                            </ListItemIcon>
                                    }
                                </Tooltip>
                            </div>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
}

const getStyles = (theme: Theme) => {
    return {
        container: {
            width: '30rem',
            padding: '0.5rem 0.5rem 0 0.5rem',
        },
        textGrid: {
            height: '3rem'
        },
        listGrid: {
            'maxHeight': '30rem',
            'overflow-y': 'auto',
        },
        boxGrid: {
            minHeight: '5rem',
            marginTop: '1rem',
            display: 'flex',
            'flex-wrap': 'wrap',
        },
        listItem: {
            height: '2.7rem'
        },
        text: {
            'overflow': 'hidden',
            'whiteSpace': 'nowrap',
        },
        url: {
            'overflow': 'hidden',
            'whiteSpace': 'nowrap',
        },
        listItemInGridView: {
            cursor: 'pointer'
        }
    }
}
export {TabSearch}
