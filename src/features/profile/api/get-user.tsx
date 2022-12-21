const getUser = async (id: string | undefined) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.log(error);
  }
};

export default getUser;
