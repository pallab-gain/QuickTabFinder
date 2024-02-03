import React from 'react';
import {TabSearch} from "./components/tab.search/tabsearch";
import {createTheme, ThemeProvider} from "@mui/material";
import {Tab} from './context/context';
import {getAllTabs} from "./api/extension";

const theme = createTheme({
    components: {
        MuiListItemButton: {
            styleOverrides: {
                "root": {
                    "&.Mui-selected": {
                        "backgroundColor": '#e0f2f1'
                    }
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                "primary": {
                    fontSize: '0.9rem'
                }
            }
        }
    },
})

function App() {
    const [tabs, setTabs] = React.useState<Array<Tab>>([])

    React.useState(() => {
        getAllTabs((currentTabs) => {
            setTabs(currentTabs)
        })
    })
    return (
        <ThemeProvider theme={theme}>
            <TabSearch tabs={tabs}/>
        </ThemeProvider>
    );
}


export default App;
