export default {
  AuthUnion: {
    __resolveType: (parent, _context, _info) => {
      if (parent.token) return "AuthToken";
      return "ResponseType";
    }
  }
}