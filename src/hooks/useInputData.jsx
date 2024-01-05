const useInputData = (e, state, setState) => {
  function input() {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }
  console.log(state);
  return input;
};
export default useInputData;
