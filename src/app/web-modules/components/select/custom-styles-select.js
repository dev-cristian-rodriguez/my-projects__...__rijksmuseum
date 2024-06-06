'use client'

const customStylesSelect = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: state.menuIsOpen ? '0px 0px 7px 7px' : '7px',
        borderTop: '1px solid #D1D5DB',
        borderLeft: '1px solid #D1D5DB',
        borderRight: '1px solid #D1D5DB',

        borderBottom: state.menuIsOpen ? 'none' : '1px solid #D1D5DB',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        borderBottomLeftRadius: state.menuIsOpen ? '0' : '5px',
        borderBottomRightRadius: state.menuIsOpen ? '0' : '5px',
        boxShadow: state.menuIsOpen ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    }),
    menu: (provided) => ({
        ...provided,
        marginTop: -4,

        borderRadius: '0px 0px 7px 7px',
        borderTop: 'none',
        borderLeft: '1px solid #D1D5DB',
        borderRight: '1px solid #D1D5DB',
        borderBottom: '1px solid #D1D5DB',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }),
    multiValue: (provided) => ({
        ...provided,
        borderRadius: '20px',
        color: '#6564DB',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F2F1FF',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,

        backgroundColor: state.menuIsOpen ? 'transparent' : 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#6564DB',
        },
    }),
};

export default customStylesSelect;
