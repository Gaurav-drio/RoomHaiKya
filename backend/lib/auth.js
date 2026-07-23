const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { read, write } = require('./db');

const JWT_SECRET = process.env.JWT_SECRET || 'smartroooms-dev-secret-2026';

function getUsers() {
  return read('users.json', []);
}

function saveUsers(users) {
  write('users.json', users);
}

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

async function register(payload) {
  const {
    name, firstName, lastName, email, password, role, phone, college,
    preferredArea, address, gender, age, lookingFor, budget, propertyTypes,
    bio, facilities, termsAccepted,
  } = payload;

  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { error: 'Email already registered' };
  }
  if (phone && users.find((u) => u.phone === phone)) {
    return { error: 'Phone number already registered' };
  }
  if (!['tenant', 'owner'].includes(role)) {
    return { error: 'Role must be tenant or owner' };
  }
  if (!termsAccepted) {
    return { error: 'You must accept Terms & Conditions' };
  }
  if (!password || password.length < 6) {
    return { error: 'Password must be at least 6 characters' };
  }

  const fullName = name || `${firstName || ''} ${lastName || ''}`.trim();

  const user = {
    id: uuidv4(),
    name: fullName,
    firstName: firstName || fullName.split(' ')[0] || '',
    lastName: lastName || fullName.split(' ').slice(1).join(' ') || '',
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    role,
    phone: phone || '',
    college: college || '',
    preferredArea: preferredArea || '',
    address: address || '',
    gender: gender || '',
    age: age ? Number(age) : null,
    lookingFor: lookingFor || (role === 'tenant' ? 'pg' : ''),
    budget: budget ? Number(budget) : null,
    propertyTypes: propertyTypes || [],
    bio: bio || '',
    facilities: facilities || [],
    termsAccepted: true,
    termsAcceptedAt: new Date().toISOString(),
    profileComplete: true,
    createdAt: new Date().toISOString(),
    status: 'active',
    listings: role === 'owner' ? [] : undefined,
    bookings: role === 'tenant' ? [] : undefined,
  };

  users.push(user);
  saveUsers(users);

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { user: sanitizeUser(user), token };
}

async function login(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: 'Invalid email or password' };
  }
  if (user.status === 'suspended') {
    return { error: 'Your account has been suspended. Contact admin.' };
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { user: sanitizeUser(user), token };
}

function updateProfile(userId, updates) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return { error: 'User not found' };

  const allowed = [
    'name', 'firstName', 'lastName', 'phone', 'college', 'preferredArea', 'address',
    'gender', 'age', 'bio', 'lookingFor', 'budget', 'propertyTypes', 'facilities',
  ];
  const next = { ...users[idx] };
  allowed.forEach((key) => {
    if (updates[key] !== undefined) next[key] = updates[key];
  });
  if (updates.firstName || updates.lastName) {
    next.name = `${next.firstName || ''} ${next.lastName || ''}`.trim() || next.name;
  }
  next.updatedAt = new Date().toISOString();
  users[idx] = next;
  saveUsers(users);
  return { user: sanitizeUser(next) };
}

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(header.slice(7), JWT_SECRET);
    const users = getUsers();
    const user = users.find((u) => u.id === decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });
    if (user.status === 'suspended') return res.status(403).json({ error: 'Account suspended' });
    req.user = sanitizeUser(user);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
}

module.exports = {
  JWT_SECRET,
  getUsers,
  saveUsers,
  sanitizeUser,
  register,
  login,
  updateProfile,
  authMiddleware,
  adminOnly,
};
