import { createMuiTheme } from '@material-ui/core/styles';
import AppColors from 'theme/AppColors';

const MuiTheme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary,
            main: AppColors.PRIMARY,
            // dark: will be calculated from palette.primary,
            // contrastText: will be calculated to contrast with palette.primary
        },
        secondary: {
            // light: will be calculated from palette.primary,
            main: AppColors.SECONDARY,
            // dark: will be calculated from palette.secondary,
            // contrastText: will be calculated to contrast with palette.primary
        },
        error: {
            main: AppColors.ERROR,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
            },
            contained: {
                boxShadow: 'none',
            },
        },
        MuiTab: {
            root: {
                '&:not(:last-child)': {
                    marginRight: 16,
                },
                fontWeight: 'bold',
                fontSize: 16,
                minWidth: 0,
                '@media (min-width: 0px)': {
                    minWidth: 0,
                },
                '@media (min-width: 600px)': {
                    fontSize: 16,
                },
                textTransform: 'none',
            },
            textColorPrimary: {
                color: '#000000',
            },
        },
        MuiCheckbox: {
            root: {
                color: AppColors.LIGHT_GREY,
                '&:checked': {
                    color: AppColors.PRIMARY,
                },
            },
            checked: {},
        },
        MuiList: {
            root: {},
            padding: {
                paddingLeft: 4,
                paddingTop: 4,
                paddingRight: 4,
                paddingBottom: 4,
            },
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    backgroundColor: '#8d8d8f',
                },
            },
        },
        MuiMenuItem: {
            root: {
                minWidth: '162px',
                fontSize: '14px',
                lineHeight: 1,
                paddingLeft: 12,
                paddingTop: 12,
                paddingRight: 12,
                paddingBottom: 12,
            },
        },
        MuiInputBase: {
            input: {
                fontSize: '14px',
            },
        },
        MuiOutlinedInput: {
            input: {
                padding: '16px 8px',
            },
        },
        MuiFormHelperText: {
            contained: {
                marginLeft: 8,
                marginRight: 8,
            },
        },
        MuiTableRow: {
            root: {
                '&.Mui-selected': {
                    backgroundColor: 'rgba(139, 62, 235, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(139, 62, 235, 0.2)',
                    },
                },
            },
            '&:hover': {
                backgroundColor: 'rgba(139, 62, 235, 0.1)',
            },
        },
        MuiTableCell: {
            root: {
                padding: '16px 8px',
                '&:not(.MuiTableCell-paddingCheckbox)': {
                    '&:first-child': {
                        padding: '16px',
                    },
                }
            },
        },
    },
});

export default MuiTheme;
