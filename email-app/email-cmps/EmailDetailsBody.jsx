

export function EmailDetailsBody ({ email }) {
    
    return <section>
        <div className="email-details-body">
            <pre>{email.body}</pre>
        </div>

    </section>
}