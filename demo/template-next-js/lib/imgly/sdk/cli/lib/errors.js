export class NotImplementedError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotImplementedError'
    }
}

export class OperationCancelledError extends Error {
    constructor(message) {
        super(message)
        this.name = 'OperationCancelledError'
    }
}


export class InvalidValueError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidValueError'
    }
}


