const getUser = async (id: string) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
