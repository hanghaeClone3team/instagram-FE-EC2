import instance from './instance/instance';

const register = async ({ email, nickname, username, password, password2 }) => {
    console.log(email, nickname, username, password, password2);
    const response = await instance.post('/api/user/signup',
    { email, nickname, username, password, password2 });
    console.log(response)
    return response;
}

const login = async({ email , password }) => {
    const response = await instance.post(`/api/user/login`, { email , password });
    console.log(response);
    return response;
}

const usernameCheck = async({ username }) => {
    const response = await instance.post(`/api/user/checkid`, { username });
    console.log(response);
    return response;
}

const likebtnClickUser = async({ id, contentHeart }) => {
    const response = await instance.post(`/api/post/${id}`, { contentHeart });
    console.log(response);
    return response;
}


export { register , login, usernameCheck, likebtnClickUser }