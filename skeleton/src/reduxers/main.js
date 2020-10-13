export default new (class {
    state = {
        name: "FramZ - Reactizy",
    }

    actions = {
        setName: (state, name) => {
            return { ...state, name }
        },
    }
})()
