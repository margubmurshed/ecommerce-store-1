import { createTheme, ThemeProvider } from "@material-ui/core/styles";
const Theme = createTheme({
    palette: {
        primary: {
            main: '#2563EB'
        }
      }
})

const MaterialTheme = props => {
    return (
        <ThemeProvider theme={Theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default MaterialTheme
