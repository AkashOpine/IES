export const customStyles = {
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      fontSize: "13px",
      fontWeight: "400",
    };
  },
  control: (base: any, state: { isFocused: any }) => ({
    ...base,
    fontSize: "14px",
    background: "white",
    borderRadius: "6px",
    //   minHeight: 0,
    //   height: "2em",
    borderColor: "#f3f6f9",
zindex:"99",
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      borderColor: state.isFocused ? "#" : "#",
    },
  }),
  menu: (base: any) => ({
    ...base,

    borderRadius: 0,

    marginTop: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    fontSize: "13px",
    padding: 0,
  }),
  option: (base: any) => ({
    ...base,
    width: "100%",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#3699FF",
    "&:hover": {
      color: "#3699FF",
    },
  }),
};
