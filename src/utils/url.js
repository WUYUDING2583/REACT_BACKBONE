const HOME="";

const mode="dev";

const dev={
    test: `/mock/test.json`,
};

const pro={
    test:`${HOME}/test`
};

const url={
    dev,
    pro
}

export default url[mode];