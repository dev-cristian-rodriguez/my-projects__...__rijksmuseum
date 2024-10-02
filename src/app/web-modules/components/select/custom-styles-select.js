export const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#f0f0f4",
    primary: "#d2d2d3",
  },
});

export const generalSelectStyle = {
  control: (styles, state) => ({
    ...styles,
    borderRadius: state.menuIsOpen ? "0px 0px 7px 7px" : "7px",
    borderTop: "1px solid #D1D5DB",
    borderLeft: "1px solid #D1D5DB",
    borderRight: "1px solid #D1D5DB",

    borderBottom: state.menuIsOpen ? "none" : "1px solid #D1D5DB",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    borderBottomLeftRadius: state.menuIsOpen ? "0" : "5px",
    borderBottomRightRadius: state.menuIsOpen ? "0" : "5px",
    boxShadow: state.menuIsOpen ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  }),

  menu: (styles) => ({
    ...styles,
    marginTop: -4,

    borderRadius: "0px 0px 7px 7px",
    borderTop: "none",
    borderLeft: "1px solid #D1D5DB",
    borderRight: "1px solid #D1D5DB",
    borderBottom: "1px solid #D1D5DB",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),

  menuPortal: (styles) => ({
    ...styles,
    zIndex: 15,
  }),

  option: (styles, state) => {
    const optionNotAvailable = {
      cursor: "not-allowed",
      opacity: 0.6,
    };

    if (state.data.isDisabled) {
      return {
        ...styles,
        ...optionNotAvailable,
        fontSize: "12px",
        color: "#647185",
      };
    } else {
      return { ...styles, fontSize: "12px", color: "#647185" };
    }
  },

  placeholder: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#9CA3AF",
    fontWeight: "400",
  }),

  input: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#647185",
    fontWeight: "400",
  }),

  singleValue: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#647185",
    fontWeight: "400",
  }),

  multiValue: (styles) => ({
    ...styles,
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "400",
    color: "#647185",
    padding: "0px 5px",
    backgroundColor: "#F2F1FF",
  }),

  multiValueRemove: (styles, state) => ({
    ...styles,

    backgroundColor: state.menuIsOpen ? "transparent" : "transparent",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#647185",
    },
  }),

  loadingMessage: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#647185",
    fontWeight: "600",
  }),

  noOptionsMessage: (styles) => ({
    ...styles,
    fontSize: "12px",
    color: "#647185",
    fontWeight: "600",
  }),
};
