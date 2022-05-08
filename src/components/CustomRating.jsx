import React from "react"
import { Rating } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { prefixer } from "stylis"

function CustomRating(props) {

    const theme = createTheme({
        direction: "rtl"
    })
    
    const cacheRtl = createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin]
    })

    return (
        <CacheProvider value={cacheRtl}>
					<ThemeProvider theme={theme}>
						<div dir="rtl">
							<Rating
								{...props}
							/>
						</div>
					</ThemeProvider>
				</CacheProvider>
    )
}

export default CustomRating