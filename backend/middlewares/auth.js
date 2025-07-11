// ========================================
// SIMPLE MIDDLEWARE - PHASE 1
// middleware/auth.js
// ========================================
import jwt from "jsonwebtoken";

// Basic JWT Authentication
export const authenticateToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.token;

        if (!token) {
            return res.json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid token"
        });
    }
};

// Role-based authorization
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.json({
                success: false,
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.json({
                success: false,
                message: `Access denied. ${req.user.role} role not authorized.`
            });
        }

        next();
    };
};





// Simple combined middleware
export const requirePatient = [authenticateToken, authorizeRoles("Patient")];


export const requireDoctor = [authenticateToken, authorizeRoles("Doctor")];

export const requireAdmin = [authenticateToken, authorizeRoles("Admin")];